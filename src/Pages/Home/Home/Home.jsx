import React from 'react';
import Banner from './Banner/Banner';
import PopularContests from '../PopularContests/PopularContests';
import ExtraSection from '../ExtraSection/ExtraSection';
import WinnerAdvertisement from '../WinnerAdvertisement/WinnerAdvertisement';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <PopularContests></PopularContests>
          <WinnerAdvertisement></WinnerAdvertisement>
          <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;