import clsx from 'clsx';
import styles from './styles.module.scss';
import TitleComponent from 'subComponents/TitleComponent';
import { RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import GlobalStructure from 'subComponents/GlobalStructure';

export const RichContent = (props) => {
  const { params } = props;
  const { Styles } = params;
  const { sitecoreContext } = useSitecoreContext();
  const { title, content, titleTag } = sitecoreContext?.route?.fields;
  const shouldRenderTitle = !!title?.value;
  return (
    <GlobalStructure
      className={clsx(styles['PageContentComponent'], 'richtext-area')}
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <div className={'component-wrapper'}>
        <div className="component-content no-paddding">
          {/* <div className={styles["component-header"]}>
            {!!beforeLink?.href && (
              <a href={beforeLink?.href} className={styles["arrow-text"]}>
                {!!beforeLink?.src && (
                  <ImageRenderer
                    src={beforeLink?.src}
                    renderSVG
                    width={9}
                    height={14}
                    className={styles["arrow-icon"]}
                  />
                )}
                {!!beforeLink?.text && (
                  <span className={styles["text"]}>{beforeLink?.text}</span>
                )}
              </a>
            )}
          </div> */}
          <div className={styles['box']}>
            <div
              className={styles['title-description-wrapper']}
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
            >
              <div
                className={clsx(
                  styles['top'],
                  'flex-it flex-align-item-center flex-justify-between'
                )}
              >
                {shouldRenderTitle && (
                  <TitleComponent className={styles['title']} field={title} headingTag={titleTag} />
                )}

                {/* <div className={styles["details"]}>
                  {!!articleDetails?.date && (
                    <div className={styles["date"]}>{articleDetails?.date}</div>
                  )}
                </div> */}
              </div>
              <RichText field={content} className={clsx(styles['list'], styles['description'])} />
              {/* <div className={styles["list"]}>
                {items?.map((item, i) => {
                  const shouldrentderTitle = !!item?.title;
                  const shouldrentderDescription = !!item?.description;
                  return (
                    <Fragment key={i}>
                      {shouldrentderTitle && (
                        <h2 className={styles["title"]}>{item?.title}</h2>
                      )}
                      {shouldrentderDescription && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                          className={styles["description"]}
                        />
                      )}
                      {!!item?.list?.length &&
                        item?.list?.map((listItem, index) => {
                          return (
                            <div key={index}>
                              <h3 className={styles["title"]}>
                                {listItem?.title}
                              </h3>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: listItem?.description,
                                }}
                                className={styles["description"]}
                              />
                            </div>
                          );
                        })}
                    </Fragment>
                  );
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </GlobalStructure>
  );
};
