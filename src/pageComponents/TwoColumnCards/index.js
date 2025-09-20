import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import Button from 'subComponents/Button';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import GlobalStructure from 'subComponents/GlobalStructure';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;

  // const { profiles, variation = '', primaryButton, title, description, anchorId } = fields;
  const { items, title, shortDescription, link, anchorId } = fields;
  const shouldRenderCards = !!items?.length;
  const shouldRenderLink = !!link?.value?.href;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderDescription = !!shortDescription?.value;
  return (
    <GlobalStructure
      className={clsx(styles['TwoColumnCards'])}
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
          {shouldRenderTitle && <TextComponent field={title} className={styles['title']} />}
          {shouldRenderDescription && (
            <TextComponent field={shortDescription} className={styles['description']} />
          )}
        </div>
        {shouldRenderLink && <Button isButton link={link} />}
      </div>
      {shouldRenderCards && (
        <ul
          className={clsx(styles['custom--grid'], 'flex-justify-center')}
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          {items.map((item, i) => {
            const {
              backgroundImage,
              link: cardLink,
              title: cardTitle,
            } = item?.fields;
            let cardShortDescription = item?.fields?.shortDescription;
            cardShortDescription.value = cardShortDescription?.value || " "
            const shouldRenderBackgroundImage = !!backgroundImage?.value?.src;
            const shouldRenderCardTitle = !!cardTitle?.value;
            const shouldRenderCardShortDescription = !!cardShortDescription?.value;
            const shouldRenderCardLink = !!cardLink?.value?.href;
            const shouldRenderInnerBox =
              shouldRenderCardTitle || shouldRenderCardShortDescription || shouldRenderCardLink;
            return (
              <li className="grid-item" key={i}>
                <div
                  aria-label={title?.value}
                  className={clsx(styles['card'])}
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay="50"
                  data-aos-duration="500"
                  // data-aos-duration={(i + 1) * 200}
                  data-aos-easing="ease-in-out"
                >
                  {shouldRenderBackgroundImage && (
                    <ImageRenderer
                      className={styles['background-image']}
                      mobileSrc={backgroundImage}
                      desktopSrc={backgroundImage}
                    />
                  )}
                  <div className={styles['overlay']} />
                  {shouldRenderInnerBox && (
                    <div className={styles['internal-box-wrap']}>
                      <div className={styles['auto']}>
                        <div className={clsx(styles['internal-box'])}>
                          {shouldRenderCardTitle && (
                            <TextComponent field={cardTitle} className={styles['title']} />
                          )}
                          <TextComponent
                            field={cardShortDescription}
                            className={styles['description']}
                          />
                          {shouldRenderCardLink && (
                            <Button isButton className={styles['link']} link={cardLink} />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </GlobalStructure>
  );
};
