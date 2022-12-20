import '../styles/About.css'
function About(){
    return (<>
    
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Our App</h1>
        <img src="/logo.png" alt="App logo" className="about-logo" />
      </div>
      <p className="about-description">
        Our app is designed to help users easily translate text from one language to another. 
        With a simple and intuitive interface, our app makes it easy for users to communicate 
        with others who speak different languages.
        We aim to open the door to global business by giving everybody access to the content they need in the language they speak.
      </p>
          <h2 className="about-features-title">Features</h2>
      <ul className="about-features-list">
        <li className="about-feature">
          <img src="/language.png" alt="Language icon" className="about-feature-icon" />
          <span className="about-feature-text">Support for three languages for now : English , Hebrow , Arabic </span>
        </li>
        <li className="about-feature">
          <img src="/translate.png" alt="Translate icon" className="about-feature-icon" />
          <span className="about-feature-text">Instant translation of text and phrases</span>
        </li>
        <li className="about-feature">
          <img src="/favorite.png" alt="Favorite icon" className="about-feature-icon" />
          <span className="about-feature-text">Ability to save and organize favorite translations</span>
        </li>
      </ul>
      <p className="about-credits">Created by LingoDev team</p>
    </div>
    <div className="container mt-5 py-5 text-center">
        <div className="container">
  
</div>
    </div>
    </>)
}
export default About 

  