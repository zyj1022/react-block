import React, { Component } from 'react';

import {Row, Col} from '../styled-grid';
import {Wrapper, Title} from './styled';

class ChartCard extends Component {

  render() {
    const { title } = this.props;
    return (
      <Row>
        <Col col='3' pull='3'>
          <Wrapper>
            <Title>
               11
            </Title>
          </Wrapper>
        </Col>
        <Col col='3' pull='3'>
22
        </Col>
        <Col col='3' pull='3'>
33
        </Col>
        <Col col='3' pull='3'>
44
        </Col>
      </Row>
    );
  }

}

export default ChartCard;
