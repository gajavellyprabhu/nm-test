import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import Button from 'subComponents/Button';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import GlobalStructure from 'subComponents/GlobalStructure';
import css from 'styled-jsx/css';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const { section1Title, section1TitleTag, section1SubTitle, section1SubTitleTag, section1Description, section1Image, section2Title, section2TitleTag, section2SubTitle, section2SubTitleTag, section2Description, section2Image, hideBackgroundPattern } = fields;
  const shouldRenderFirstTitle = !!section1Title?.value;
  const shouldRenderFirstSubTitle = !!section1SubTitle?.value;
  const shouldRenderFirstDescription = !!section1Description?.value;
  const shouldRenderFirstImage = !!section1Image?.value?.src;
  const shouldRenderSecondTitle = !!section2Title?.value;
  const shouldRenderSecondSubTitle = !!section2SubTitle?.value;
  const shouldRenderSecondDescription = !!section2Description?.value;
  const shouldRenderSecondImage = !!section2Image?.value?.src;
  const shouldShowPattern = !hideBackgroundPattern?.value;

  return (
    <GlobalStructure
      className={clsx(styles['DualTwoColumnCards'])}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div
        className={clsx(styles['top'], '')}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className={clsx(styles['firstSection'], 'flex-it flex-justify-between')}>
          <div className={styles['data']}>
            {shouldRenderFirstTitle && <TextComponent field={section1Title} headingTag={section1TitleTag} className={styles['title']} />}
            {shouldRenderFirstSubTitle && <TextComponent field={section1SubTitle} className={styles['subTitle']} headingTag={section1SubTitleTag} />}
            {shouldRenderFirstDescription && (
              <TextComponent field={section1Description} className={styles['description']} />
            )}
          </div>
          {shouldRenderFirstImage && (
            <div className={styles['setcion-1-image']}>
              <ImageRenderer
                className={styles['image']}
                mobileSrc={section1Image}
                desktopSrc={section1Image}
              />
            </div>
          )}
        </div>
        <div className={clsx(styles['secondSection'], 'flex-it')}>
          {shouldRenderSecondImage && (
            <div className={styles['setcion-2-image']}>
              {shouldShowPattern && (<ImageRenderer
                className={styles['pattern']}
                icon="/images/dualTwoColumnsCardsPattern.svg"
                renderSVG
              />)
              }
              <ImageRenderer
                className={styles['image-section2']}
                mobileSrc={section2Image}
                desktopSrc={section2Image}
              />
            </div>
          )}
          <div className={clsx(styles['data'])}>
            {shouldRenderSecondTitle && <TextComponent field={section2Title} headingTag={section2TitleTag} className={styles['title']} />}
            {shouldRenderSecondSubTitle && <TextComponent field={section2SubTitle} className={styles['subTitle']} headingTag={section2SubTitleTag} />}
            {shouldRenderSecondDescription && (
              <TextComponent field={section2Description} className={styles['description']} />
            )}
          </div>

        </div>

      </div>

    </GlobalStructure>
  );
};
