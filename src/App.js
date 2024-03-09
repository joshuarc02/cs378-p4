import './App.css';
import Header from './components/Header.js'
import { useState, useEffect } from "react";
import { Row, Col, Accordion, Card } from "react-bootstrap";

var previous_ends = Array(50).join(' ').split(' ')
const api_root = ''
var possible_ends = new Set([''])
function App() {
  /** all alt comes from the prompt that generated the image*/

  let api_base = 'https://www.dnd5eapi.co/api/'

  let [api_end, set_api_end] = useState('')

  let [api_result, set_api_result] = useState(Object())

  // makes an array of 1000 '' strings to create a buffer of that many undos
  // TODO: Shoud proably change it to an id setup instead of the actual calls so that this doesnt grow large quicky like [1,2,1,3] would be mapped using {1:'', 2:'ability_scores', ...}


  function fetch_api(){
    fetch(api_base + api_end).then(data => data.json()).then(json => set_api_result(json)).catch(err => set_api_result(err))
  }
  
  // setup stuff
  useEffect(() =>{
    fetch_api()
  },[])
  // making it automatically call fetch_api when api_end is changed
  useEffect(() => {
    fetch_api();
  }, [api_end]);
  

  // technically i think this could allow for arbitrary code execution
  // but this isnt a security class so im going to ignore that lol
  function update_end(new_end){
    new_end = new_end.replace('//','/')
    // updating all of the previous ends stuff
    previous_ends.push(new_end)
    previous_ends.shift()
    console.log(previous_ends)

    // setting the new api_end
    set_api_end(new_end)
    console.log(new_end)
    console.log(api_result)
  }

  function set_root(){
    update_end(api_root)
  }

  function back(){
    previous_ends.unshift(api_root)
    // removing current end
    previous_ends.pop()
    // updating to previous end
    update_end(previous_ends.pop() + '/')
  }

  function random_end(){
    // just tries a random url 
    // https://stackoverflow.com/questions/42739256/how-get-random-item-from-es6-map-or-set

    let temp_end = Array.from(possible_ends)[Math.floor(Math.random() * possible_ends.size)]
    update_end(temp_end + '/')
  }

  function concat_end(addition){
    update_end(api_end + '/' + addition)
  }

  function chain_depack(temp_result, depth){
    // console.log(temp_result)
    if(typeof temp_result === 'object'){
      let results = [];
      let keys;

      // js treats arrays as objects so i need to deal with them differntly
      if(Array.isArray(temp_result)){
        keys = [...temp_result.keys()]
      } else {
        keys = Object.keys(temp_result)
      }
      
      for (let key of keys){
        let deep_depack = chain_depack(temp_result[key], depth + 1)
        
        console.log('deep_depack')
        console.log(deep_depack)
        if(deep_depack.type === 'p'){
          console.log('deep_depack.length === \'p\'')

          results.push( 
            <Accordion.Item>
              <span className="accordion-header fake-accordion-button">{key}: "{deep_depack.props.children}"</span>
            </Accordion.Item>)
        } else {
          results.push(
            <Accordion.Item eventKey={key}>
              <Accordion.Header>{key}</Accordion.Header>
              <Accordion.Body>
                {deep_depack}
              </Accordion.Body>
            </Accordion.Item>
            )
        }
      };
      if(results.length === 1){
        console.log('test')
      }
      // console.log(temp_result)
      return <Accordion alwaysOpen>{results}</Accordion>;
    }
    // console.log('^^^')
    // checking for possible api calls like "/api/ability-scores"
    let temp_str = temp_result.toString()
    if(temp_str.length > 5 && temp_str.substr(0,5) === '/api/' ){
      possible_ends.add(temp_str.substr(5, temp_str.length))
    };
    return <p>{temp_str}</p>
  }
  console.log(possible_ends)
  // https://react-bootstrap.github.io/docs/components/navbar
  return (
    <div>
      <Row>
        <Col>
          <Header set_root={set_root} back={back} concat_end={concat_end} api_end={api_end} random_end={random_end}/>
          {chain_depack(api_result, 0)}
        </Col>
      </Row>
    </div>
  );
}

export default App;
