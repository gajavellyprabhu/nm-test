import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import GlobalStructure from 'subComponents/GlobalStructure';
import { useListingComponentContext } from 'subComponents/Listing/context/ListingComponentContext';
import styles from './styles.module.scss';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ImageRenderer from 'subComponents/ImageRenderer';
import Button from 'subComponents/Button';
import { useGlobalContext } from 'globalContext/context';
import BasicSelect from 'subComponents/Listing/FilterComponent/SubComponents/BasicSelect';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
// import DesktopTabs from 'subComponents/Listing/FilterComponent/SubComponents/DesktopTabs';

// const PageSizeLimit = 5;
const FAQsListing = (props) => {
  const { sitecoreContext } = useSitecoreContext();
  const scrollToRef = useRef(null);
  const { fields, params } = props;
  const { Styles } = params;
  const { pageSize, title, titleTag } = fields;
  // const { sitecoreContext } = useSitecoreContext();
  // const NavigationTitle = sitecoreContext?.route?.fields?.NavigationTitle;
  const { isDesktopLayout } = useGlobalContext();
  const isFAQPage = sitecoreContext.itemPath === '/faqs/';
  const {
    dataToRender,
    hasNext,
    // loadingData,
    allFilters,
    // setSelectedFilters,
    handleChangeFilter,
    handleResetPageLimit,
    loadMore,
    totalCount,
  } = useListingComponentContext();

  const isPagination = totalCount > pageSize?.value;

  // const shouldRenderQA = !!dataToRender?.length;
  const shouldRenderTitle = !!title?.value;
  const [expanded, setExpanded] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [animateScroll, setAnimateScroll] = useState(false);
  const [jsonLdData, setJsonLdData] = useState(null);
  const [hasScriptBeenAdded, setHasScriptBeenAdded] = useState(false); 

  const handleChange = (panelIndex) => {
    setExpanded((preValue) => (panelIndex === preValue ? null : panelIndex));
  };

  // const handleSetfilters = ({ name, value }) => {
  //   setSelectedFilters((preValue) => [...preValue, { name, value }]);
  // };

  const handleLoadMore = () => {
    setAnimateScroll((prev) => !prev);
    return hasNext ? loadMore() : handleResetPageLimit();
  };

  useEffect(() => {
    let time = 0;
    if (!!scrollToRef?.current) {
      clearTimeout(time);
      time = setTimeout(() => {
        const scrollToTop = {
          behavior: 'smooth',
          top: scrollToRef?.current?.offsetTop,
        };
        window.scrollTo(scrollToTop);
      }, 450);
    }
  }, [animateScroll, scrollToRef]);

  useEffect(() => {
    if (dataToRender && !hasScriptBeenAdded) {
      setJsonLdData({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: dataToRender?.map(item => ({
          '@type': 'Question',
          name: item?.item.question?.value,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item?.item.answer?.value,
          },
        })),
      });
      setHasScriptBeenAdded(true);
    }
  }, [dataToRender, hasScriptBeenAdded]);

  return (
    <GlobalStructure
      className={clsx(styles['FAQsListing'])}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      {jsonLdData && hasScriptBeenAdded && isFAQPage && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
          />
        </Head>
      )}
      <div className={styles['faq_container']}>
        <div className={styles['left-section']}>
          {shouldRenderTitle && (
            <TitleComponent headingTag={titleTag} field={title} className={styles['title']} />
          )}
          {!isDesktopLayout && <BasicSelect />}
          {/* {isDesktopLayout && <DesktopTabs />} */}
          {isDesktopLayout && !!allFilters && allFilters?.length > 0 && (
            <div className={styles['tabs-container']}>
              {allFilters?.map((item, i) => {
                const { items, filterCategory } = item;
                return items?.map((_item, _i) => {
                  const { name, value } = _item;
                  const isTabActive = activeTab === _i;
                  return (
                    // <div key={_i} onClick={() => handleChangeFilter({ filterCategory, value })}>
                    //   {name}
                    // </div>
                    <div className={styles['tab-container']} key={_i} tabIndex={0}>
                      <TextComponent
                        className={clsx(isTabActive && styles['active'], styles['tab'])}
                        onClick={() => {
                          handleChangeFilter({ filterCategory, value });
                          setActiveTab(_i);
                          setExpanded(0);
                        }}
                        field={{ value: name || value }}
                      />
                      {isTabActive && <div className={styles['underline']} />}
                    </div>
                  );
                });
              })}
            </div>
          )}

          {/* {shouldRenderHyperlink && (
            <ButtonArrow label={link?.value?.text} link={link?.value?.href} />
          )} */}
        </div>
        <div className={clsx(styles['items_container'])}>
          {dataToRender?.map((item, i) => {
            const { question, answer } = item?.item;
            const isExpended = i === expanded;
            const shouldRenderQuestion = !!question?.value;
            const shouldRenderAnswer = !!answer?.value;
            return (
              <Accordion
                sx={{ backgroundColor: 'unset!important' }}
                key={i}
                // disableGutters
                elevation={0}
                // square
                expanded={isExpended}
                onChange={() => handleChange(i)}
                className={clsx(styles['accordion_container'], isExpended && styles['active'])}
              >
                <AccordionSummary
                  className={styles['summary']}
                  expandIcon={
                    isExpended ? (
                      <ImageRenderer
                        // src="/images/faq_close.svg"
                        icon="/images/faq_close.svg"
                        className={styles['tab_open_icon']}
                        renderSVG
                      />
                    ) : (
                      <ImageRenderer
                        // src="/images/faq_open.svg"
                        icon="/images/faq_open.svg"
                        className={styles['tab_open_icon']}
                        renderSVG
                      />
                    )
                  }
                >
                  {shouldRenderQuestion && (
                    <Typography className={styles['question']}>{question?.value}</Typography>
                  )}
                </AccordionSummary>
                <AccordionDetails className={styles['answer']}>
                  {shouldRenderAnswer && <p className={styles['text']}>{answer?.value}</p>}
                </AccordionDetails>
              </Accordion>
            );
          })}
          {/* <div onClick={() => loadMore()}>Load more</div> */}
          {isPagination && (
            <span ref={scrollToRef}>
              <Button
                onClick={() => handleLoadMore()}
                isButton
                text={hasNext ? t('label_loadMore') : t('label_loadLess')}
                prefix={
                  <ImageRenderer
                    icon={hasNext ? 'images/ico_plus.svg' : 'images/ico_minus.svg'}
                    renderSVGInImageTag
                    className={styles['plus_icon']}
                  />
                }
                className={styles['load_more_btn']}
              />
            </span>
          )}
        </div>
      </div>
    </GlobalStructure>
  );
};
export default FAQsListing;
