import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import GlobalStructure from 'subComponents/GlobalStructure';
import TextComponent from 'subComponents/TextComponent';
import TitleComponent from 'subComponents/TitleComponent';
import { useI18n } from 'next-localization';
import { dateFormat } from '../../Helpers/dateTimeHelper';
import { useGlobalContext } from 'globalContext/context';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';

export const Default = (props) => {
  const { t } = useI18n();

  const { fields } = props;
  const params = props?.params;
  const Styles = params?.Styles;
  const {
    bannerShortDescription,
    date,
    bannerMobileImage,
    bannerImage,
    title,
    category,
    titleTag,
    // paddingClass,
  } = fields;
  const { locale } = useGlobalContext();
  const shouldRenderBannerTitle = !!title?.value;
  const shouldRenderBannerShortDescription = !!bannerShortDescription?.value;
  const shouldRenderMainImage = !!bannerImage?.value?.src;
  let categoryId = category?.id?.toLowerCase()?.replaceAll('-', '');
  let formattedDate = dateFormat(date?.value, locale);
  // let finalDate = {
  //   value: `${formattedDate.month} ${formattedDate.day}, ${formattedDate.year}`,
  // };

  const shouldRenderDate = !!formattedDate;

  function getUrlWithoutLastSection(url) {
    // Remove trailing slash if it exists
    let cleanUrl = url.replace(/\/$/, '');

    // Remove the last section of the URL after the last slash
    let urlWithoutLastSection = cleanUrl.substring(0, cleanUrl.lastIndexOf('/'));

    // Ensure the result ends with a trailing slash
    if (!urlWithoutLastSection.endsWith('/')) {
      urlWithoutLastSection += '/';
    }

    return urlWithoutLastSection;
  }

  const [urlWithoutLastSection, setUrlWithoutLastSection] = useState(null);
  useEffect(() => {
    const currentUrl = window.location.href;
    // setUrlWithoutLastSection(currentUrl.substring(0, currentUrl.lastIndexOf('/')));
    setUrlWithoutLastSection(getUrlWithoutLastSection(currentUrl));
  }, []);
  const getCategory = (type) => {
    let category = '';
    if (type?.toLowerCase()?.indexOf('def7f6c8d26f4f5f828de16257d154e3') !== -1) {
      category = t('label_press_release');
    }
    if (type?.toLowerCase()?.indexOf('b5e20d30538c4c13adbe1739f86364ef') !== -1) {
      category = t('lablel_interview');
    }
    if (type?.toLowerCase()?.indexOf('c9171630f9cb46afaba28f929e1f9cbb') !== -1) {
      category = t('label_gallery');
    }
    if (type?.toLowerCase()?.indexOf('4937151a0c7f4059b55bfd2324cf85dd') !== -1) {
      category = t('label_article');
    }

    return category;
  };
  return (
    <GlobalStructure
      isFullWidth
      className={styles['NewsDetailBanner']}
      // defaultPaddingClass="padding-default-Y-0"
      paddingClass={Styles}
      anchorId={props?.rendering?.uid}
    >
      <Helmet>
        <script
          type="text/javascript"
          src={`https://platform-api.sharethis.com/js/sharethis.js#property=65b79f583625b4001a8bcd77`}
          async="async"
        ></script>
      </Helmet>
      <div className={styles['content-container']}>
        {shouldRenderMainImage && (
          <div className={styles['image']}>
            <ImageRenderer
              className={styles['image-banner']}
              // src={mainImage?.src}
              desktopSrc={bannerImage}
              mobileSrc={bannerMobileImage}
            />
          </div>
        )}
        <div className={styles['box-pusher']}></div>
        {(shouldRenderBannerShortDescription || shouldRenderBannerTitle) && (
          <div className={styles['data_box']}>
            <div className={styles['data_box_relative']}>
              <div className={styles['data']}>
                <div className={styles['data-inner']}>
                  <div className={clsx(styles['share-button'])}>
                    <div
                      className={clsx(
                        styles['share-svg'],
                        'flex-it flex-align-item-center flex-justify-center'
                      )}
                    >
                      <ImageRenderer
                        className={styles['image-share']}
                        icon={'/images/ico_share.svg'}
                      />
                    </div>
                    <div className="sharethis-inline-share-buttons"></div>
                  </div>
                  <a
                    aria-label={t('BacktoNewsMedia')}
                    {...(!!urlWithoutLastSection && { href: urlWithoutLastSection })}
                    className={styles['go_back']}
                  >
                    <span className={styles['image-arrow']}>
                      <ImageRenderer
                        className={styles['image-banner']}
                        icon={'/images/ico_chevron_left.svg'}
                      />{' '}
                    </span>
                    {t('BacktoNewsMedia')}
                  </a>
                  <div className={styles['feed_date_container']}>
                    <span className={styles['feed']}>{getCategory(categoryId)}</span>
                    {shouldRenderDate && (
                      <span className={styles['date']}>
                        {' '}
                        |
                        <TextComponent
                          className={styles['date-value']}
                          headingTag={{ value: 'span' }}
                          field={{ value: ' ' + formattedDate['d m y'] }}
                        />
                      </span>
                    )}
                  </div>
                  {shouldRenderBannerTitle && (
                    <TitleComponent
                      headingTag={titleTag}
                      field={title}
                      className={styles['title']}
                    />
                  )}
                  {shouldRenderBannerShortDescription && (
                    <TextComponent
                      field={bannerShortDescription}
                      className={styles['description']}
                    />
                    // <div className={styles['description']}>{description?.value}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlobalStructure>
  );
};
