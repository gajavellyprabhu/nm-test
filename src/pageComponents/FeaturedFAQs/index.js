'use client';
import { useState } from 'react';
import GlobalStructure from 'subComponents/GlobalStructure';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { AccordionSummary, AccordionDetails, Typography, Accordion } from '@mui/material';
import ImageRenderer from 'subComponents/ImageRenderer';
import ButtonArrow from 'subComponents/ButtonArrow';
import TitleComponent from 'subComponents/TitleComponent';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const { items, link, title, titleTag } = fields;
  // const shouldRenderQA = !!items?.length;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderHyperlink = !!link?.value?.href;

  const [expanded, setExpanded] = useState(0);

  const handleChange = (panelIndex) => {
    setExpanded((preValue) => (panelIndex === preValue ? null : panelIndex));
  };
  return (
    <GlobalStructure
      className={styles['FeaturedFAQs']}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div className={styles['faq_container']}>
        <div className={styles['left-section']}>
          {/* {shouldRenderTitle && <h2 className={styles['title']}>{title?.value}</h2>} */}
          {shouldRenderTitle && (
            <TitleComponent headingTag={titleTag} className={styles['title']} field={title} />
          )}
          {shouldRenderHyperlink && (
            <ButtonArrow label={link?.value?.text} link={link?.value?.href} />
          )}
        </div>
        <div className={styles['items_container']}>
          {items?.map((item, i) => {
            const { question, answer } = item?.fields;
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
        </div>
      </div>
    </GlobalStructure>
  );
};
