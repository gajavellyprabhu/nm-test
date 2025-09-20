'use client';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import styles from './styles.module.scss';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useGlobalContext } from 'globalContext/context';
import GlobalStructure from 'subComponents/GlobalStructure';
import ImageRenderer from 'subComponents/ImageRenderer';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import Video from 'subComponents/Video';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import ButtonWithIcon from 'subComponents/ButtonWithIcon';

const PopupHandler = dynamic(() => import('subComponents/PopupHandler'));

export const Default = (props) => {
  const [expanded, setExpanded] = useState(0);
  const { isUnderIpadLayout } = useGlobalContext();
  const { fields, params } = props;
  const { Styles } = params;
  const { items, title, link, titleTag } = fields;
  const [videoIndex, setVideoIndex] = useState(-1);
  const overIpadLayout = !isUnderIpadLayout;
  const shouldRenderLink = !!link?.value?.text;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderItems = !!items?.length > 0;
  const shouldRender2Cards = items?.length <= 2;
  const shouldRender6Cards = items?.length === 3 || items?.length === 6;

  const handleMouseEnter = (index) => {
    setVideoIn76dex(index);
  };

  const handleChange = (panelIndex) => {
    setVideoIndex(panelIndex);
    setExpanded((preValue) => (panelIndex === preValue ? null : panelIndex));
  };

  const CardItem = ({ item }) => {
    const { title, video, description, titleTag, image } = item?.fields;
    const shouldRenderItem = !!image?.value?.src && !!title?.value;
    const shouldRenderTitle = !!title?.value;
    const shouldRenderDescription = !!description?.value;
    const [play, setPlay] = useState(false);

    return (
      <Fragment>
        {shouldRenderItem && (
          <div className={styles['item']} onMouseEnter={() => setPlay(true)}>
            <div className={styles['box']}>
              <div className={styles['image-box']}>
                <div className={styles['image']}>
                  <ImageRenderer desktopSrc={image} mobileSrc={image} />
                </div>
                <div className={styles['hover-image']}>
                  {shouldRenderDescription && (
                    <div className={clsx(styles['flex-description'])}>
                      <TextComponent
                        field={description}
                        className={clsx(styles['item-description'])}
                      />
                    </div>
                  )}
                </div>
              </div>
              {shouldRenderTitle && (
                <TitleComponent
                  headingTag={titleTag}
                  className={clsx(styles['box-title'], 'flex', 'items-end', 'justify-center')}
                  field={title}
                />
              )}
            </div>
          </div>
        )}

      </Fragment>
    );
  };

  return (
    <GlobalStructure className={styles['SquareGrid']}  paddingClass={Styles} anchorId={props?.rendering?.uid}>
      <div
        className={clsx(styles['top'], 'flex-it flex-justify-between')}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className={styles['data']}>
          {shouldRenderTitle && (
            <TitleComponent headingTag={titleTag} className={styles['title']} field={title} />
          )}
        </div>
        {shouldRenderLink && (
          <div className={clsx(styles['learn-more'], 'flex-it')}>
            <a href={link.value.href} className="primary-button fit-height">
              {link.value.text}
            </a>
          </div>
        )}
      </div>
      {overIpadLayout && (
        <div className={styles['mid']}>
          <div
            className={clsx(
              styles['items'],
              shouldRender6Cards
                ? styles['six-cards']
                : shouldRender2Cards
                  ? styles['two-cards']
                  : '',
              'flex align-top flex-wrap'
            )}
          >
            {shouldRenderItems &&
              items?.map((item, index) => {
                return <CardItem item={item} key={index} />;
              })}
          </div>
        </div>
      )}

      {isUnderIpadLayout && (
        <div className={styles['accordionContainer']}>
          {shouldRenderItems &&
            items?.map((item, index) => {
              const { image, description, title, titleTag, videoMobileSrc, imageMobile } =
                item?.fields;
              const shouldRenderImage = !!imageMobile?.value?.src;
              const shouldRenderTitle = !!title?.value;
              const shouldRenderDescription = !!description?.value;
              const isExpended = index === expanded;
              return (
                <div className={styles['accordion-parent']} key={index}>
                  <Accordion
                    className={styles['accordion-custom']}
                    expanded={isExpended}
                    onChange={() => handleChange(index)}
                    disableGutters={true}
                  >
                    <AccordionSummary
                      className={styles['accordionSummary']}
                      expandIcon={
                        isExpended ? (
                          <ImageRenderer
                            className={styles['image-close-open']}
                            icon="/images/expand_icon.svg"
                            renderSVG
                          />
                        ) : (
                          <ImageRenderer
                            className={styles['image-close-open']}
                            icon="/images/collapse_icon.svg"
                            renderSVG
                          />
                        )
                      }
                    >
                      {shouldRenderImage && (
                        <div className={styles['accordion-summary_image']}>
                          <ImageRenderer desktopSrc={image} mobileSrc={imageMobile} />
                        </div>
                      )}
                      {shouldRenderTitle && (
                        <TitleComponent
                          headingTag={titleTag}
                          className={styles['title']}
                          field={title}
                        />
                      )}
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className={styles['image-text-wrap']}>
                        <div className={styles['image']}>
                          {!!videoMobileSrc ? (
                            <Video
                              config={{
                                file: {
                                  attributes: {
                                    loading: 'lazy',
                                  },
                                },
                              }}
                              videoUrl={videoMobileSrc}
                              autoplay={index === videoIndex}
                            />
                          ) : (
                            shouldRenderImage && (
                              <ImageRenderer desktopSrc={image} mobileSrc={imageMobile} />
                            )
                          )}
                        </div>
                        {shouldRenderDescription && (
                          <TextComponent
                            field={description}
                            className={clsx(styles['description'])}
                          />
                        )}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
        </div>
      )}
    </GlobalStructure>
  );
};

export const SquareGridVideo360 = (props) => {
  const [expanded, setExpanded] = useState(0);
  const [popupVideoLink, setPopupVideoLink] = useState(null); // Track popup video link
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage popup state
  const { isUnderIpadLayout } = useGlobalContext();
  const { fields, params } = props;
  const { Styles } = params;
  const { items, title, link, titleTag, disclaimer } = fields;

  const shouldRenderDisclaimer = !!disclaimer?.value;
  const handleAccordionClick = (popupLink) => {
    if (popupLink) {
      window.open(popupLink, '_blank'); // Open the link in a new tab
    }
  };

  const handleBackdropClick = () => {
    setIsPopupOpen((prev) => !prev);
    setPopupVideoLink(null); // Clear the popup video link
  };
  const CardItem = ({ item, onPlayVideo }) => {
    const { title, titleTag, image, popupVideoLink, popupLabel, imageMobile } = item?.fields;

    const shouldRenderTitle = !!title?.value;
    const shouldRenderImage = !!image?.value?.src;
    const shouldRenderPopup = !!popupVideoLink?.value?.href;

    return (
      <div className={clsx(styles['item'], 'card-item')}>
        <div className={styles['box']}>
          {/* Image Section */}
          <div className={styles['image-box']}>
            <div className={styles['image']}>
              {shouldRenderImage && (
                <ImageRenderer desktopSrc={image} mobileSrc={imageMobile || image} />
              )}
            </div>
            {/* Hover and Play Button */}
            {shouldRenderPopup && (
              <div className={styles['hover-image']}>
                <div className={clsx(styles['flex-description'], 'flex-it flex-align-item-center ')}>
                  <ImageRenderer
                    className={styles['icon-360']}
                    icon="/images/Icon_360.svg"
                    renderSVG
                  />
                  <ButtonWithIcon
                    label={popupLabel?.value || 'Play Video'}
                    icon={'/images/ico_play.svg'}
                    handleClick={() => {
                      onPlayVideo(popupVideoLink?.value?.href);
                      setIsPopupOpen(true); // Ensure popup is opened
                    }}
                    className={'play-button'}
                    renderSVGInImageTag
                  />
                </div>
              </div>
            )}
          </div>

          {/* Title Section */}
          {shouldRenderTitle && (
            <TitleComponent
              headingTag={titleTag}
              className={clsx(styles['box-title'], 'flex', 'items-end', 'justify-center')}
              field={title}
            />
          )}
        </div>
      </div>
    );
  };

  const renderAccordionItems = () =>
    items?.map((item, index) => {
      const { image, title, titleTag, popupVideoLinkMobile, imageMobile } = item?.fields;
      const shouldRenderImage = !!imageMobile?.value?.src;
      const shouldRenderTitle = !!title?.value;
      const shouldRenderPopup = !!popupVideoLinkMobile?.value?.href;

      return (
        <div className={styles['accordion-parent']} key={index}>
          <Accordion
            className={styles['accordion-custom']}
            expanded={false} // Disable expansion
            disableGutters={true}
          >
            <AccordionSummary
              className={styles['accordionSummary']}
              onClick={() => handleAccordionClick(popupVideoLinkMobile?.value?.href)} // Trigger popup on click
              expandIcon={
                <ImageRenderer
                  className={styles['image-play-mobile']}
                  icon="/images/watch360.svg"
                  renderSVG
                />
              }
            >
              {shouldRenderImage && (
                <div className={styles['accordion-summary_image']}>
                  <ImageRenderer desktopSrc={image} mobileSrc={imageMobile} />
                </div>
              )}
              {shouldRenderTitle && (
                <TitleComponent
                  headingTag={titleTag}
                  className={styles['title']}
                  field={title}
                />
              )}
            </AccordionSummary>
          </Accordion>
        </div>
      );
    });

  return (
    <GlobalStructure className={clsx(styles['SquareGrid'], styles['SquareGridVideo360'])}  paddingClass={Styles} anchorId={props?.rendering?.uid}>
      <div className={clsx(styles['top'], 'flex-it flex-justify-between')}>
        <div className={styles['data']}>
          {title?.value && (
            <TitleComponent headingTag={titleTag} className={styles['title']} field={title} />
          )}
        </div>
        {link?.value?.text && (
          <div className={clsx(styles['learn-more'], 'flex-it')}>
            <a href={link.value.href} className="primary-button fit-height">
              {link.value.text}
            </a>
          </div>
        )}
      </div>

      {isUnderIpadLayout ? (
        <div className={styles['accordionContainer']}>{renderAccordionItems()}</div>
      ) : (
        <div className={styles['mid']}>
          <div
            className={clsx(
              styles['items'],
              items?.length <= 2 ? styles['two-cards'] : styles['six-cards'],
              'flex align-top flex-wrap'
            )}
          >
            {items?.map((item, index) => (
              <CardItem item={item} key={index} onPlayVideo={setPopupVideoLink} />
            ))}
          </div>
        </div>
      )}

      <div>
        {shouldRenderDisclaimer &&
          (
            <TextComponent
              field={disclaimer}
              className={clsx(styles['disclaimer'])}
            />
          )
        }
      </div>



      <PopupHandler
        className={styles['PopupHandler']}
        videoUrl={popupVideoLink}
        handleBackdropClick={handleBackdropClick}
        openPopup={isPopupOpen}
        muted={false}
        loop={true}
        autoplay={true}
        showControls={true}
      />

    </GlobalStructure>
  );
};
