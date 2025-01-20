import '../App.css'
import Article from '../components/Article'
import TitleBar from '../components/TitleBar'
import SideHeader from '../components/SideHeader'
import { useAuth } from '../components/AuthContext'
import {articles} from '../components/ArticleData';



const Body = () => {

    const {userRole} = useAuth();
    console.log(userRole)
    const pageTitle = 'Sekcja Żeglarska Politechniki Gdańskiej';
    const pageLinks = [
        { text: 'Politechnika Gdańska', href: '/sailing-webpage', title: 'Wróć do poprzedniej strony' },
        { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/sailing-webpage', title: 'Obecna strona' },
  ];


    return (
      <div className='main-content'>
        <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
        <section className="main">
            <div className='container2'>
                {articles.map(article => (
                    <Article key={article.id} data={article} />
                ))}
            </div>
            <SideHeader/>
        </section>
      </div>
    );
  };

  export default Body;
