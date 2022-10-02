import * as React from 'react';
import Image from 'next/future/image'
import coin from '../../assets/img/ph_coin-vertical-fill.svg'
import time from '../../assets/img/bxs_time.svg'

function Searchbar() {
    return (
        <>
            <div className='ink_infotoogle'>
                <div className='ink_infotoogle-dot'>
                    <Image src={coin} alt="Icon" /> Dot $7.730 (3.82 %)
                </div>
                <div className='ink_infotoogle-last'>
                    <Image src={time} alt="Icon" /> Latest Block: 4,363,437 (1m ago)
                </div>
                <div className='ink_infotoogle-sdk'>
                    SDK: v.0.1
                </div>
            </div>
        </>
    );
}

export default Searchbar;