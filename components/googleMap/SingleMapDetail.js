import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

// 申請的google api key
import { apiKey } from '../../pages/stray/googleApi'

const mapStyles = {
  stylers: 
  [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90"
        }
      ]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62"
        }
      ]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58"
        }
      ]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555"
        }
      ]
    },
    {
      featureType: "road.local",
      stylers: [
        {
          color: "#e49bed"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63"
        }
      ]
    },
    {
      featureType: "transit.line",
      stylers: [
        {
          color: "#f3bc44"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d"
        }
      ]
    }
  ]
}

export class SingleMapDetail extends Component {
  static defaultProps = {
    lat: 25.0259029,
    lng: 121.5703875,
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  onMapReady = (mapProps, map) => {
    this.map = map
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      'componentDidUpdate',
      prevProps.lat,
      this.props.lat,
      prevProps.lng,
      this.props.lng
    )

    if (prevProps.google !== this.props.google) {
      this.loadMap()
    }

    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
      this.recenterMap()
    }
  }

  recenterMap = () => {
    const map = this.map
    const curr = { lat: this.props.lat, lng: this.props.lng }

    const google = this.props.google
    const maps = google.maps

    console.log(this.props, this.map)

    if (map) {
      //console.log(this.markerOne.current.marker)
      let center = new maps.LatLng(curr.lat, curr.lng)
      map.panTo(center)
      map.setZoom(12)

      //console.log(this.infoWindowOne.current.infowindow)
      // let markerCurrent = this.markerOne.current.marker
      // let infowindowCurrent = this.infoWindowOne.current.infowindow
      // infowindowCurrent.open(map, markerCurrent)
    }
  }

  render() {
    //console.log(this.props)
    return (
      <Map
        google={this.props.google}
        containerStyle={{
          width: '100%',
          height: '700px',
          position: 'relative',
        }}
        zoom={17}
        mapTypeControl={false}
        scaleControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        style={mapStyles}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.lng,
        }}
        onClick={this.onMapClicked}
        onReady={this.onMapReady}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'物件位置'}
          position={{ lat: this.props.lat, lng: this.props.lng }}
          icon={{ // 自訂圖示
            url: "https://photo-static-api.fotomore.com/creative/vcg/veer/nowarter800/new/VCG41N683910872.jpg", // 圖示的 URL
            scaledSize: new this.props.google.maps.Size(50, 50) // 圖示的大小
          }}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.props.infoTitle}</h1>
            <p>{this.props.infoContent}</p>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey,
  language: 'zh-TW',
})(SingleMapDetail)