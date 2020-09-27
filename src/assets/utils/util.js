export default {
  realPx (val) {
    let _rpxVal = val / 144;
    let _htmlFZ = Number(getComputedStyle(document.documentElement)['font-size'].replace(/px/, ''))
    return _rpxVal * _htmlFZ;
  }
}
