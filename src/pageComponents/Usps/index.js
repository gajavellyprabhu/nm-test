import GlobalStructure from 'subComponents/GlobalStructure';
import styles from './styles.module.scss';
import ImageRenderer from 'subComponents/ImageRenderer';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const { title, shortDescription, items, anchorId, titleTag, shortDescriptionTag } = fields;
  const shouldRenderTitle = !!title?.value;
  const shouldRenderShortDescription = !!shortDescription?.value;
  const shouldRenderItems = !!items?.length;

  return (
    <GlobalStructure
      className={styles['Usps']}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div
        className={styles['content_container']}
        data-aos="fade-up"
        data-aos-offset="50"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        {shouldRenderTitle && (
          <TitleComponent headingTag={titleTag} className={styles['title']} field={title} />
        )}
        {shouldRenderShortDescription && (
          <TextComponent
            field={shortDescription}
            className={styles['description']}
            headingTag={shortDescriptionTag}
          />
        )}
      </div>

      <div className={styles['logos-parent']}>
        {shouldRenderItems &&
          items?.map((item, i) => {
            const { title, icon, iconMobile, titleTag } = item?.fields;
            const shouldRenderImage = !!icon?.value?.src;
            const shouldRenderTitle = !!title?.value;
            return (
              <div
                key={i}
                // className="grid__col-4"
                data-aos="fade-up"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-easing="ease-in-out"
                data-aos-duration="500"
                // data-aos-duration={(i + 1) * 200}
              >
                <div className={styles['logo-container']}>
                  {shouldRenderImage && (
                    <div className={styles['image-cadre']}>
                      <ImageRenderer
                        // {...{ src, alt }}
                        desktopSrc={icon}
                        mobileSrc={iconMobile}
                        className={styles['image']}
                      />
                    </div>
                  )}
                  {shouldRenderTitle && (
                    // <p
                    //   className={styles['logo-text']}
                    //   dangerouslySetInnerHTML={{
                    //     __html: text,
                    //   }}
                    // />
                    <TitleComponent
                      headingTag={titleTag}
                      className={styles['logo-text']}
                      field={title}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </GlobalStructure>
  );
};
