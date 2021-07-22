import React from "react";

import img from './cute-cat.jpg';
import s from './style.module.less'

const CuteCat = () => (
  <div className={`${s.catStyle}`}>
    <img src={img} />
  </div>
);

export default CuteCat;
