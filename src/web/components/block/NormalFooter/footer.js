import React, { Component } from 'react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import tmpls from './footer.t.html';

@registerTmpl('Footer')
class Footer extends Component {

  // jsx
  /*render() {
    const { title } = this.props;
    return (
      <div style={{ height: '84px', lineHeight: '84px',textAlign: 'center', backgroundColor:'#ccc' }}>
        Copyright © 2004-2018 xx.COM xx版权所有 Power by xx部
      </div>
    );
  }*/

  // nj
  /*render() {
   return nj`
     <div class="test1" style="height:84px; line-height:84px; text-align: center;">
       Copyright © 2004-2018 xx.COM xx版权所有 Power by xx部
     </div>
   `(this.props);
  }
  */

 render() {
   const { copyRight } = this.props;
   return tmpls.footer(this.props);
 }
}

export default Footer;
