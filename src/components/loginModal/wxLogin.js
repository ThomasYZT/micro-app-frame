export default function (a) {
  var c = "default";
  a.self_redirect === !0 ? c = "true": a.self_redirect === !1 && (c = "false");
  var d = document.createElement("iframe"),
    e = "https://open.weixin.qq.com/connect/qrconnect?appid=" + a.appid +
      "&scope=" + a.scope +
      "&redirect_uri=" + a.redirect_uri +
      "&state=" + a.state +
      "&login_type=jssdk&self_redirect=" + c +
      '&styletype=' + (a.styletype || '') +
      '&sizetype=' + (a.sizetype || '') +
      '&bgcolor=' + (a.bgcolor || '') +
      '&rst=' + (a.rst || '');

  e += a.style ? "&style=" + a.style: "";
  e += a.href ? "&href=" + a.href: "";
  d.src = e;
  d.sandbox = 'allow-scripts allow-top-navigation';
  d.frameBorder = "0";
  d.allowTransparency = "true";
  d.scrolling = "no";
  d.width = "300px";
  d.height = "400px";
  var f = document.getElementById(a.id);
  f.innerHTML = "";
  f.appendChild(d)
}