import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import Button from 'subComponents/Button';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';
import PopupContainer from './PopupContainer';
import { v4 } from 'uuid';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getLangDir } from 'utils';
import { useGlobalContext } from 'globalContext/context';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;

  // const { profiles, variation = '', primaryButton, title, description, anchorId } = fields;
  const { items, title, shortDescription, link, anchorId, titleTag } = fields;

  const shouldRenderProfiles = !!items?.length;
  const shouldRenderLink = !!link?.value?.href;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderDescription = !!shortDescription?.value;
  return (
    <GlobalStructure
      className={clsx(styles['MembersListing'], styles['MembersListing-def'])}
      id={anchorId ?? ''}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      {/* <div className={'component-wrapper'}>
        <div className={'component-content no-paddding'}> */}
      <div
        className={clsx(styles['top'], 'flex-it flex-justify-between')}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className={styles['data']}>
          {
            shouldRenderTitle && (
              <TextComponent headingTag={titleTag} field={title} className={styles['title']} />
            )
            // <div className={styles['title']}>{title?.value}</div>
          }
          {shouldRenderDescription && (
            <TextComponent field={shortDescription} className={styles['description']} />
            // <div className={styles['description']}>{description?.value}</div>
          )}
        </div>
        {shouldRenderLink && (
          // <span>
          <Button isButton text={link?.value?.text} link={link?.value?.href} />
          // </span>
        )}
      </div>
      {/* </div>
      </div> */}

      {/* <div className={'component-wrapper'}>
        <div className={'component-content no-paddding'}> */}
      {shouldRenderProfiles && (
        <ol
          className={clsx(styles['custom--grid'], 'flex-justify-center')}
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          {items?.map((item, i) => {
            const { logo, logoMobile, name, title } = item?.fields;
            const shouldRenderImage = !!logo?.value?.src;
            const shouldRenderName = !!name?.value;
            const shouldRenderPosition = !!title?.value;
            return (
              <li className="grid-item" key={i}>
                <div className={styles['profile-item']}>
                  {shouldRenderImage && (
                    <div className={styles['image-cadre']}>
                      <ImageRenderer
                        // src={image?.src}
                        className={styles['image']}
                        desktopSrc={logo}
                        mobileSrc={logoMobile}
                      />
                    </div>
                  )}
                  {shouldRenderName && <TitleComponent field={name} className={styles['name']} />}
                  {shouldRenderPosition && (
                    <TextComponent field={title} className={styles['position']} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {/* </div>
      </div> */}
    </GlobalStructure>
  );
};

export const CommitteeMemberListing = (props) => {
  const { fields, params } = props;
  const { Styles } = params;

  // const { profiles, variation = '', primaryButton, title, description, anchorId } = fields;
  const { items, title, shortDescription, link, anchorId, titleTag } = fields;

  const shouldRenderProfiles = !!items?.length;
  const shouldRenderLink = !!link?.value?.href;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderDescription = !!shortDescription?.value;
  return (
    <GlobalStructure
      className={clsx(styles['MembersListing'], styles['CommitteeMemberListing'])}
      id={anchorId ?? ''}
      paddingClass={Styles}
    >
      <div
        className={clsx(styles['top'], 'flex-it flex-justify-between')}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className={styles['data']}>
          {
            shouldRenderTitle && (
              <TextComponent field={title} className={styles['title']} headingTag={titleTag} />
            )
            // <div className={styles['title']}>{title?.value}</div>
          }
          {shouldRenderDescription && (
            <TextComponent field={shortDescription} className={styles['description']} />
            // <div className={styles['description']}>{description?.value}</div>
          )}
        </div>
        {shouldRenderLink && (
          // <span>
          <Button isButton text={link?.value?.text} link={link?.value?.href} />
          // </span>
        )}
      </div>

      {shouldRenderProfiles && (
        <ol
          className={clsx(styles['custom--grid'], 'flex-justify-center')}
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          {items?.map((item, i) => {
            const { name, title } = item?.fields;
            const shouldRenderName = !!name?.value;
            const shouldRenderPosition = !!title?.value;
            return (
              <li className="grid-item" key={i}>
                <div className={styles['profile-item']}>
                  {shouldRenderName && <TitleComponent field={name} className={styles['name']} />}
                  {shouldRenderPosition && (
                    <TextComponent field={title} className={styles['position']} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </GlobalStructure>
  );
};
export const MemberListingWithPopup = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const { t } = useI18n();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const [uniqueId, setUniqueId] = useState();
  const { locale } = useGlobalContext();
  // const swiperRef = useRef(null);
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);
  // const progressBarRef = useRef(null);

  // const { profiles, variation = '', primaryButton, title, description, anchorId } = fields;
  const { items, title, shortDescription, link, anchorId, titleTag } = fields || {};

  const shouldRenderProfiles = !!items?.length;
  const shouldRenderLink = !!link?.value?.href;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderDescription = !!shortDescription?.value;

  useEffect(() => {
    !!!uniqueId && setUniqueId(v4());
  }, [uniqueId]);

  // useEffect(() => {
  //   if (swiperRef.current && swiperRef.current.swiper) {
  //     swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
  //     swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
  //     swiperRef.current.swiper.navigation.update();
  //   }
  // }, []);

  const handleOpenInfoPopup = (i) => {
    setSwiperActiveIndex(i);
    setIsPopupOpen(true);
  };

  const handleBackdropClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <GlobalStructure
      className={clsx(styles['MembersListing'], styles['MembersListing-def'])}
      id={anchorId ?? ''}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      {/* <div className={'component-wrapper'}>
        <div className={'component-content no-paddding'}> */}
      <div
        className={clsx(styles['top'], 'flex-it flex-justify-between')}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className={styles['data']}>
          {
            shouldRenderTitle && (
              <TextComponent field={title} className={styles['title']} headingTag={titleTag} />
            )
            // <div className={styles['title']}>{title?.value}</div>
          }
          {shouldRenderDescription && (
            <TextComponent field={shortDescription} className={styles['description']} />
            // <div className={styles['description']}>{description?.value}</div>
          )}
        </div>
        {shouldRenderLink && (
          // <span>
          <Button isButton text={link?.value?.text} link={link?.value?.href} />
          // </span>
        )}
      </div>
      {/* </div>
      </div> */}

      {/* <div className={'component-wrapper'}>
        <div className={'component-content no-paddding'}> */}
      {shouldRenderProfiles && (
        <ol
          className={clsx(styles['custom--grid'], 'flex-justify-center')}
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          {items.map((item, i) => {
            const { logo, logoMobile, name, title, shortDescription, titleTag } = item?.fields;
            const shouldRenderImage = !!logo?.value?.src;
            const shouldRenderName = !!name?.value;
            const shouldRenderPosition = !!title?.value;
            const shouldRenderShortDescription = !!shortDescription?.value;

            return (
              <li className="grid-item" key={i}>
                <div
                  className={clsx(
                    styles['profile-item'],
                    styles['hover-effect'],
                    shouldRenderShortDescription && styles['pointer-cursor']
                  )}
                  {...(shouldRenderShortDescription && {
                    onClick: () => {
                      setSwiperActiveIndex(i);
                      handleOpenInfoPopup(i);
                    },
                  })}
                >
                  {shouldRenderImage && (
                    <div className={styles['image-cadre']}>
                      <ImageRenderer
                        // src={image?.src}
                        className={styles['image']}
                        desktopSrc={logo}
                        mobileSrc={logoMobile}
                      />
                    </div>
                  )}
                  {shouldRenderName && (
                    <TitleComponent field={name} className={styles['name']} headingTag={titleTag} />
                  )}
                  {shouldRenderPosition && (
                    <TextComponent field={title} className={styles['position']} />
                  )}
                  {shouldRenderShortDescription && (
                    <div className={styles['btn-container']}>
                      <span className={styles['knowmore-text']}> {t('KnowMore')}</span>
                      <div className={styles['btn-container-arrow']}>
                        <ImageRenderer
                          icon="/images/Line_arrow.svg"
                          className={styles['line-icon']}
                        />
                        <ImageRenderer
                          icon="/images/arrow-line-members.svg"
                          className={styles['arrow-icon']}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {uniqueId && (
        <PopupContainer
          // isPopupOpen={isPopupOpen}
          // handleBackdropClick={() => handleBackdropClick()}
          className={styles['membersPopUp']}
          {...{ isPopupOpen, handleBackdropClick }}
        >
          <GlobalStructure className={clsx(styles['PopupContainer-container'])}>
            <div
              className={clsx(
                'component-content default-padding-Y',
                styles['modified-component-content']
              )}
            >
              <div className={styles['background-white']} />
              <div className={styles['close']} onClick={handleBackdropClick}>
                <div className={styles['background-animation']} />
                <ImageRenderer
                  className={styles['close-icon']}
                  icon={`/images/close_icon_with_bg.svg`}
                />
              </div>
              <div className={styles['gray-background']}></div>
              <div className={styles['swiper-container']}>
                <Swiper
                  // ref={swiperRef}
                  slidesPerView={1}
                  initialSlide={swiperActiveIndex}
                  // loop={false}
                  // spaceBetween={32}
                  dir={getLangDir(locale)}
                  pagination={{
                    el: `.global-swiper-pagination-${uniqueId}`,
                    type: 'progressbar',
                  }}
                  effect={'fade'}
                  fadeEffect={{ crossFade: true }}
                  // className={styles['cards-wrapper']}
                  modules={[Navigation, Pagination, EffectFade]}
                  navigation={{
                    nextEl: `.members-swiper-button-next-${uniqueId}`,
                    prevEl: `.members-swiper-button-prev-${uniqueId}`,
                  }}

                  // slidesPerView="auto"
                >
                  {items?.map((item, i) => {
                    const { logo, logoMobile, name, title, shortDescription } = item?.fields;
                    const shouldRenderImage = !!logo?.value?.src;
                    const shouldRenderName = !!name?.value;
                    const shouldRenderPosition = !!title?.value;
                    const shouldRenderShortDescription = !!shortDescription?.value;

                    return (
                      <SwiperSlide
                        key={i}
                        // className={clsx(styles['image_slide'])}
                      >
                        <div className={clsx(styles['content-wrapper'])}>
                          <div className={clsx(styles['content-container'], styles['mobile'])}>
                            <div className={styles['intro']}>
                              {shouldRenderName && (
                                <TitleComponent field={name} className={styles['name']} />
                              )}
                              {shouldRenderPosition && (
                                <TextComponent field={title} className={styles['position']} />
                              )}
                            </div>
                          </div>
                          <div className={styles['image-container']}>
                            {shouldRenderImage && (
                              <ImageRenderer
                                // src={image?.src}
                                className={styles['image']}
                                desktopSrc={logo}
                                mobileSrc={logoMobile}
                              />
                            )}
                          </div>
                          <div className={styles['content-container']}>
                            <div className={styles['intro']}>
                              {shouldRenderName && (
                                <TitleComponent field={name} className={styles['name']} />
                              )}
                              {shouldRenderPosition && (
                                <TextComponent field={title} className={styles['position']} />
                              )}
                            </div>
                            <div className={styles['description-container']}>
                              {shouldRenderShortDescription && (
                                <>
                                  {/* <TitleComponent field={items?.[0]?.fields?.name} className={styles['name']} /> */}
                                  <p className={styles['experience']}>{t('Experience')}</p>
                                  <TextComponent
                                    // field={{
                                    //   value:
                                    //     'Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board members are as follows.Our board ',
                                    // }}
                                    field={shortDescription}
                                    className={styles['description']}
                                  />
                                </>
                              )}
                            </div>
                            {/* <div className={styles['description']}></div> */}
                          </div>
                          {/* <div className={styles['gray-background']}></div> */}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <div className={'component-wrapper'}>
                  <div className={clsx('component-conten')}>
                    <div className={'global-swiper-buttons'}>
                      <div className={'global-swiper-pagination-wrap'}>
                        <div
                          className={`global-swiper-pagination global-swiper-pagination-${uniqueId}`}
                          // className={`global-swiper-pagination`}
                          // ref={progressBarRef}
                        ></div>
                      </div>

                      <div className={'global-nav-wrap'}>
                        <div
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.target.click();
                            }
                          }}
                          className={clsx(
                            'global-swiper-button',
                            `members-swiper-button-prev-${uniqueId}`
                          )}
                          // ref={prevRef}
                        >
                          <ImageRenderer
                            icon={'/images/ico_angle_left.svg'}
                            renderSVG
                            width={9}
                            height={14}
                          />
                        </div>
                        <div
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.target.click();
                            }
                          }}
                          className={clsx(
                            'global-swiper-button',
                            `members-swiper-button-next-${uniqueId}`
                          )}
                          // ref={nextRef}
                        >
                          <ImageRenderer
                            icon={'/images/ico_angle_right.svg'}
                            renderSVG
                            width={9}
                            height={14}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlobalStructure>
        </PopupContainer>
      )}
      {/* </div>
      </div> */}
    </GlobalStructure>
  );
};
