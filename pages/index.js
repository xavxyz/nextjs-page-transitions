import React from 'react';
import IconBase from '../components/IconBase';
import IconMapPin from '../components/IconMapPin';

export default class Index extends React.Component {
  mapContainer = React.createRef();

  componentDidMount() {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic2RyYXNuZXIiLCJhIjoiY2pmZzBqZmptMjI1eTMzbWl1bGExMHppZyJ9.diPXryPOiyMuqcV4mpNOlg';
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/sdrasner/cjfg0watl6rkv2sllf6hepdd5',
    });
  }

  render() {
    return (
      <main className="main-index-hacky-stuff-next-refactor">
        <div className="places" ref="places">
          {this.props.places.map(place => (
            <div className="location" key={place.name}>
              <img src={place.img} alt={place.name} />
              <h2>{place.name}</h2>
              <p>
                <strong>Rating: {place.rating}</strong>
              </p>
              <p>{place.description}</p>
              <hr />
            </div>
          ))}
        </div>
        <div className="mapcontain" ref={this.mapContainer}>
          <p>
            <IconBase iconName="mappin">
              <IconMapPin />
            </IconBase>{' '}
            Checked in at Honolulu location
          </p>
        </div>
        <style jsx global>
          {`
            .main-index-hacky-stuff-next-refactor {
              padding-top: 20px;
              border-top: 1px solid #ddd;
              margin-top: 120px;

              hr {
                border-top: 1px solid #ddd;
                border-bottom: none;
                margin-top: 15px;
              }
            }

            .mapboxgl-missing-css {
              display: none;
            }

            .places {
              img {
                float: left;
                margin: 0 15px 15px 0;
              }
              p {
                margin-top: 10px;
              }
              .location {
                padding: 10px 0;
              }
            }

            .mapcontain {
              width: 35%;
              float: right;
              height: 400px;
              p {
                margin: 10px 0;
              }
            }

            @media screen and (max-width: 600px) {
              .mapcontain {
                width: 100%;
                margin: 10px 0;
              }
            }
          `}
        </style>
      </main>
    );
  }
}
