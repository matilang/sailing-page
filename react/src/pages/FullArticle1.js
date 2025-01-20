import { Link } from 'react-router-dom';
import yacht from '../images/baner_yacht.jpg';
import '../App.css'
import TitleBar from '../components/TitleBar';
import React from 'react';

function generateArticleList(items) {
    return items.map(item => <li>{item}</li>);
}

export default function FullArticle1() {

    const pageTitle = 'Aktulaności';
    const pageLinks = [
        { text: 'Politechnika Gdańska', href: '/sailing-webpage'},
        { text: 'Sekcja Żeglarska Politechniki Gdańskiej', href: '/sailing-webpage'},
        { text: 'Aktulaności', href: '/FullArticle1'},
    ];

    const courseDates = ['02.07-15.07', '16.07-29.07', '30.07-12.08', '13.08-26.08'];
    const courseCosts = ['Studenci PG – 1200,- PLN', 'Inni spoza PG – 1600,- PLN'];
    const priceIncludes = [
        'szkolenie',
        'zakwaterowanie na terenie ośrodka PG',
        'pełne wyżywienie (3 posiłki dziennie)',
        'wypożyczenie materiałów szkoleniowych',
        'ubezpieczenie'
    ];
    const priceExcludes = [
        'dojazdu',
        'kosztów egzaminu i kosztów wydania patentu - 50% zniżki dla młodzieży uczącej się do 26 roku życia z ważną legitymacją'
    ];
    const rights = [
        'prowadzenie jachtów żaglowych bez lub z pomocniczym napędem mechanicznym po wodach śródlądowych',
        'prowadzenie jachtów żaglowych bez lub z pomocniczym napędem mechanicznym o długości całkowitej do 8,5 m po wodach morskich w strefie 2 Mm od brzegu w porze dziennej'
    ];


    return(
        <div className='main-content'>
            <TitleBar mainTitle={pageTitle} pageLinks={pageLinks}/>
            <div className="container1">
                <div className='article-dates'>Data dodania: 10-20-2020</div>
                <div className='article-titles'><h2>Kurs żeglarza jachtowego</h2></div>
                <div className='article-images'><img src={yacht} alt=''></img></div>
                <div className='text'>
                    <p>
                    Jak co roku Sekcja Żeglarska ma zaszczyt zaprosić na obozy szkoleniowe na patent żeglarza jachtowego. Oferujemy studentom Politechniki Gdańskiej możliwość zdobycia pierwszych żeglarskich szlifów na wodach jeziora Jeziorak w niepowtarzalnej atmosferze. Szkolić będą doskonale przygotowani instruktorzy, w ośrodku mamy profesjonalny sprzęt do zajęć teoretycznych oraz flotylle 4 jachtów czekających na świeżych adeptów żeglarstwa.
                    </p>
                    <p><strong>Terminy: </strong></p>
                    <ul>
                        {generateArticleList(courseDates)}
                    </ul>
                    <p><strong>Koszt: </strong></p>
                    <ul>
                        {generateArticleList(courseCosts)}
                    </ul>
                    <p><strong>Cena obejmuje: </strong></p>
                    <ul>
                        {generateArticleList(priceIncludes)}
                    </ul>
                    <p><strong>Cena nie obejmuje: </strong></p>
                    <ul>
                        {generateArticleList(priceExcludes)}
                    </ul>
                    <p><strong>ORGANIZATOR ZASTRZEGA SOBIE ODWOŁANIE KURSÓW W RAZIE BRAKU CHĘTNYCH DO SZKOLENIA.</strong></p>
                    <div className='sign-in'>
                    <Link to='/allcourses'>Zapisy</Link>
                    </div>
                    <p><strong>Płatności: </strong></p>
                    <p>Płatność na konto PG:</p>
                    <p><strong>40 1090 1098 0000 0001 2023 3750   Santander Bank Polska SA</strong></p>
                    <p>
                        W celu rezerwacji miejsca należy dokonać wpłaty zaliczki <strong>100 PLN</strong> w na dwa tygodnie przed rozpoczęciem kursu i wysłać na adres:pgzagle@gmail.com, tytułem: Wpłata ŻJ - TX - Imię Nazwisko(X - numer turnusu)
                    </p>
                    <p><strong>Złe zatytułowanie może spowodować niedostarczenie wiadomości!!!</strong></p>
                    <p>
                        Resztę kwoty należy wpłacić na dwa tygodnie przed rozpoczęciem kursu i również wysłać na podany wyżej mail. Oczywiście można wysłać całą kwotę jednym przelewem.
                    </p>
                    <p><strong>Uprawnienia żeglarza jachtowego: </strong></p>
                    <ul>
                        {generateArticleList(rights)}
                    </ul>
                </div>
            </div>
        </div>
    );
}