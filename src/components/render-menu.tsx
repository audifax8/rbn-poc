
import React from 'react';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';

import style from '../css/render-menu.module.css';
import { setRenderMenu } from '@/slices/app';
import Menu from './menu';

export default function RenderMenu() {

  const { renderMenu, configureReady } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();


  return (
    <>
    {!renderMenu && configureReady &&
      <div className={style.showMenuContainer}>
        <button
          className={``}
          onClick={() => dispatch(setRenderMenu())}
        >
          <Image
            className=''
            src='/menu.svg'
            alt='Next.js logo'
            width={31}
            height={54}
          />
        </button>
      </div>
    }
    {renderMenu && <Menu></Menu>}
    </>
  );
};

/*

{!renderMenu && configureReady &&
            <div className={style.showMenuContainer}>
              <button
                className={``}
                onClick={() => dispatch(setRenderMenu())}
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='31' height='54' viewBox='0 0 31 54' fill='none'>
                  <path d='M15.5 0.499999C23.7843 0.5 30.5 7.21573 30.5 15.5L30.5 38.5C30.5 46.7843 23.7843 53.5 15.5 53.5C7.21573 53.5 0.5 46.7843 0.5 38.5L0.500001 15.5C0.500002 7.21573 7.21573 0.499999 15.5 0.499999Z' stroke='black'/>
                  
                  <svg xmlns='http://www.w3.org/2000/svg' width='17' height='16' viewBox='0 0 17 16' fill='none'>
                    <g clipPath='url(#clip0_8327_11548)'>
                      <path d='M8.50001 12.943L0.695343 5.13798L1.63801 4.19531L8.50001 11.057L15.362 4.19531L16.3047 5.13798L8.50001 12.943Z' fill='#1F1F24'/>
                    </g>
                    <defs>
                      <clipPath id='clip0_8327_11548'>
                        <rect width='16' height='16' fill='white' transform='translate(0.5)'/>
                      </clipPath>
                    </defs>
                  </svg>

                </svg>
              </button>
            </div>
          }
          {renderMenu &&
            <Menu></Menu>
          }
 */