import './SectionPage.css'
import SideHeader from '../SideHeader';
import TitleBar from '../TitleBar';

const SectionPage = () => {
    const pageTitle = 'Sekcja';
    const pageLinks = [
        { text: 'Politechnika Gdańska', href: '/#', title: 'Wróć do poprzedniej strony' },
        { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/#', title: 'Obecna strona' },
        { text: 'Sekcja', href: '/section', title: 'Obecna strona' },
  ];
    return(
        <div>
            <TitleBar mainTitle={pageTitle} pageLinks={pageLinks}/>
            <div className='container1'>
                <div className='text'>
                    <h4>Misja</h4>
                    Misją Sekcji Żeglarskiej jest dzielenie się pasją, rozwój edukacji morskiej i podtrzymywanie tradycji żeglarskiej na nadmorskiej uczelni jaką jest Politechnika Gdańska.
                    <h4>Działalność</h4>
                    W ramach działalności Sekcji Żeglarskiej organizujemy:
                    <ul>
                        <li>Szkolenia na stopnie żeglarskie:
                            <ul>
                                <li>Żeglarz Jachtowy PZŻ</li>
                                <li>Jachtowy Sternik Morski PZŻ</li>
                                <li>Sternik Motorowodny PZMWiNW</li>
                                <li>Nauczyciel Żeglowania PZŻ</li>
                            </ul>
                        </li>
                        <li>Rejsy morskie</li>
                        <li>Seminaria o tematyce żeglarskiej</li>
                        <li>Spotkania z pasjonatami żeglarstwa</li>
                    </ul>
                    <h4>Żeglarstwo Regatowe</h4>
                    W zawodach sportowych Sekcja Żeglarska Politechniki Gdańskiej, dzięki wsparciu Rektora PG, jest reprezentowana przez regatowe załogi żeglarskie tworzące PG Racing. Więcej na stronach:
                    <ul>
                        <li><a href='/#'>PG Racing Team</a></li>
                        <li><a href='/#'>Facebook PG Racing</a></li>
                    </ul>
                </div>
            </div>
            <SideHeader/>
        </div>
    );
}
export default SectionPage;