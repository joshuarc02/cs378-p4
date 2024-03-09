import { useState } from "react";
import { Container, Row, Col, Navbar, Nav, Button, Form, Card} from "react-bootstrap";

function Header({set_root, update_end, back, random_end, concat_end, api_end}) {
  let logo_alt = 'Imagine a dynamic and playful logo that encapsulates the essence of both Dungeons and Dragons and graph visualization. This logo features an intricate web that connects various iconic elements such as detailed characters, polyhedral dice, and character sheets. Each element is carefully interlinked, suggesting a network or graph, highlighting the interconnected nature of characters, items, and scenarios in D&D. The design balances the complexity of graph theory with the fantasy and adventure of D&D, using vibrant colors to add a sense of fun and energy. The logo should be inviting to those who love role-playing games and data visualization alike, hinting at both strategic depth and imaginative play.';

  // https://react-bootstrap.github.io/docs/components/navbar

  function clear_and_submit() {
    let addition = document.getElementById('form-search').value
    document.getElementById('form-search').value = ''
    concat_end(addition)
  }
  
  return (
    <Navbar className="bg-body-tertiary"> 
      <Container fluid>
        <Row>
          <Col xs='auto' className='p-0'>
            <Navbar.Brand onClick={() => set_root()}>
              <img src={process.env.PUBLIC_URL + "/logo.png"} alt={logo_alt}/>
            </Navbar.Brand>
          </Col>
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Container fluid>
                  <Row className="justify-content-between">
                    <Col xs='auto'>
                      <Button id='root-button' variant='outline-primary' onClick={() => set_root()}>
                        Root
                      </Button>
                      <Button id='back-button' variant='outline-primary' onClick={() => back()}>
                        Back
                      </Button>
                      <Button id='random-button' variant='outline-primary' onClick={() => random_end()}>
                        Random
                      </Button>
                    </Col>
                    <Col fluid>
                      <Form inline>
                        <Row >
                          <Col className='p-0'>
                            <Form.Control id='form-search' type="text" placeholder="Next Layer"/>
                          </Col>
                          <Col xs="auto" className='p-0'>
                            <Button id='form-submit' onClick={clear_and_submit} >Submit</Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col>
                      Current api_end: '/api/{api_end}'
                    </Col>
                  </Row>
                </Container>
              </Nav>
            </Navbar.Collapse> 
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
