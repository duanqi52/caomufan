var PI= 3.1415926535897932384626
var x_pi= 3.14159265358979324 * 3000.0 / 180.0

function delta (lng, lat) {
  // Krasovsky 1940
  //
  // a = 6378245.0, 1/f = 298.3
  // b = a * (1 - f)
  // ee = (a^2 - b^2) / a^2;
  var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
  var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
  var dlng = transformlng(lat - 105.0, lng - 35.0);
  var dlat = transformlat(lat - 105.0, lng - 35.0);
  var radlng = lng / 180.0 * PI;
  var magic = Math.sin(radlng);
  magic = 1 - ee * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dlng = (dlng * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
  dlat = (dlat * 180.0) / (a / sqrtMagic * Math.cos(radlng) * PI);
  console.log(dlng,dlat)
  return {'lng': dlng, 'lat': dlat};
}



function outOfChina (lng, lat) {
  if (lng < 72.004 || lng > 137.8347)
    return true;
  if (lat < 0.8293 || lat > 55.8271)
    return true;
  return false;
}

function transformlng (x, y) {
  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
  console.log(ret)
  return ret;
}

function transformlat (x, y) {
  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
  console.log(ret)
  return ret;
}

//GPS---高德
export function gcj_encrypt ( wgslng , wgslat ) {
  let lng=parseFloat(wgslng)
  let lat=parseFloat(wgslat)
  if (outOfChina(lng, lat))
    return [lng,lat]

  var d = delta(lng, lat);

  return [(lng+ d.lng),(lat+d.lat)]
}
