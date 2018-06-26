import React, {Component} from 'react';
import {registerComponent} from 'nornj';

import {Row, Col} from '../styled-grid';
import {Card, CardHeader, CardBody} from './styled';

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

  render() {
    const {title} = this.props;
    return (
      <Row>
        <ItemGroup col='3' bgColor='#9fe0f5'/>
        <ItemGroup col='3' bgColor='#9fd96b'/>
        <ItemGroup col='3' bgColor='#f1d675'/>
        <ItemGroup col='3' bgColor='#7c72d8'/>
      </Row>
    );
  }

}

export default ChartCard;

registerComponent({'wee-ChartCard': ChartCard});
