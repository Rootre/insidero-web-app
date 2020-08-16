const mapIdToProps = {
  1: {
    map: 'czechia',
    projectionConfig: {
      scale: 9000,
      center: [15.4749126, 49.8037633],
    }
  },
  '1.1': {
    map: 'czechia_jihomoravsky',
    projectionConfig: {
      scale: 25000,
      center: [16.661996859077234, 49.117561160287466]
    }
  },
  '1.2': {
    map: 'czechia_ustecky',
    projectionConfig: {
      scale: 25000,
      center: [13.848770207167066, 50.57576538896818]
    }
  },
  '1.3': {
    map: 'czechia_jihocesky',
    projectionConfig: {
      scale: 25000,
      center: [14.439604683202697, 49.09333173218196]
    }
  },
  '1.4': {
    map: 'czechia_plzensky',
    projectionConfig: {
      scale: 25000,
      center: [13.135138486667113, 49.53190792406558]
    }
  },
  '1.6': {
    map: 'czechia_stredocesky',
    projectionConfig: {
      scale: 25000,
      center: [14.554647073075806, 50.056851587653694]
    }
  },
  '1.7': {
    map: 'czechia_moravskoslezsky',
    projectionConfig: {
      scale: 32000,
      center: [18.05745630177681, 49.885190133533814]
    }
  },
  '1.8': {
    map: 'czechia_karlovarsky',
    projectionConfig: {
      scale: 40000,
      center: [12.704720633570686, 50.17017977224245]
    }
  },
  '1.9': {
    map: 'czechia_vysocina',
    projectionConfig: {
      scale: 32000,
      center: [15.690902896087293, 49.40714605665504]
    }
  },
  '1.10': {
    map: 'czechia_olomoucky',
    projectionConfig: {
      scale: 25000,
      center: [17.190205934027116, 49.876662165192846]
    }
  },
  '1.11': {
    map: 'czechia_zlinsky',
    projectionConfig: {
      scale: 38000,
      center: [17.769334490790204, 49.23975472382483]
    }
  },
  '1.12': {
    map: 'czechia_kralovehradecky',
    projectionConfig: {
      scale: 35000,
      center: [15.866034481015854, 50.384513537643905]
    }
  },
  '1.13': {
    map: 'czechia_pardubicky',
    projectionConfig: {
      scale: 35000,
      center: [16.189269179289187, 49.900375819712735]
    }
  },
  '1.14': {
    map: 'czechia_liberecky',
    projectionConfig: {
      scale: 40000,
      center: [14.991631565889106, 50.702007889600246]
    }
  },
  2: {
    map: 'poland',
    projectionConfig: {
      rotate: [-19, -52, 0],
      scale: 4800,
    }
  },
  3: {
    map: 'slovakia',
    projectionConfig: {
      rotate: [-19.7, -48.7, 0],
      scale: 12000,
    }
  },
}

function getInteractiveMapProps (id) {
  if (!mapIdToProps.hasOwnProperty(id)) {
    return null
  }

  return mapIdToProps[id]
}

export default getInteractiveMapProps