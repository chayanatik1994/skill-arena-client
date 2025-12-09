import React from 'react';
import Banner from './Banner/Banner';
import PopularContests from '../PopularContests/PopularContests';
import WinnerAdvertisement from '../WinnerAdvertisement/WinnerAdvertisement';
import ExtraSection from '../ExtraSection/ExtraSection';

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