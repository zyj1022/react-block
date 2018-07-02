import React, {Component} from 'react';
import {registerComponent} from 'nornj';

import {Row, Col} from '../styled-grid';
import {Card, CardHeader, CardBody} from './styled';

import { Bar } from '../Chartbar';

const ItemGroup = (props) => {
   return (
     <Col col={props.col}>
       <Card>
         <CardBody bgColor={props.bgColor}>

         </CardBody>
       </Card>
     </Col>
   )
 }

class ChartCard extends Component {

  componentDidMount() {

  }
  // <ItemGroup col='3' bgColor='#9fe0f5'/>
  // <ItemGroup col='3' bgColor='#9fd96b'/>
  // <ItemGroup col='3' bgColor='#f1d675'/>
  // <ItemGroup col='3' bgColor='#7c72d8'/>

  render() {
    const { theme } = this.props;
    return (
      <Row>
        <Col col='3'>
         <Card>
           <CardBody bgColor='#9fe0f5'>

           </CardBody>
         </Card>
       </Col>
       <Col col='3'>
        <Card>
          <CardBody bgColor='#9fd96b'>

          </CardBody>
        </Card>
      </Col>
      </Row>
    );
  }

}

export default ChartCard;

registerComponent({'wee-ChartCard': ChartCard});
