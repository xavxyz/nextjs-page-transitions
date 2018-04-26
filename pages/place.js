import IconBase from '../components/IconBase';
import IconMapPin from '../components/IconMapPin';
import AppStarRating from '../components/AppStarRating';

export default ({ users, places, selectedUser }) => (
  <main className="place-page">
    <div className="places">
      <p className="top">{selectedUser.name}'s Places</p>
      <h1>{places[0].name}</h1>
      <p>
        <strong>Rating: {places[0].rating}</strong>
      </p>
      <div className="stars">
        <AppStarRating />
      </div>

      <div className="main-img" />
      <p>{places[0].description}</p>
    </div>

    <aside className="sidebar">
      <h3>Other Trips</h3>
      {places.map(place => (
        <div className="location" key={place.name}>
          <img src={place.img} alt={place.name} />
          <p className="top">
            <strong>{place.name}</strong>
          </p>
          <p>{place.description}</p>
          <hr />
        </div>
      ))}
    </aside>

    <style jsx global>
      {`
        .place-page {
          h1 {
            font-size: 45px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
          }

          .location img {
            width: 70px;
            float: left;
            margin: 0 10px 10px 0;
          }

          p,
          .stars {
            margin: 10px 0;
          }

          .main-img {
            background: url('/static/header1.jpg') center center;
            background-size: cover;
            width: 100%;
            height: 240px;
          }

          .top {
            margin: 30px 0 0;
          }
        }
      `}
    </style>
  </main>
);
