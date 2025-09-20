import { useCallback, useEffect, useState } from 'react';
import ImageRenderer from 'subComponents/ImageRenderer';
import styles from './styles.module.scss';
import TitleComponent from 'subComponents/TitleComponent';
import TextComponent from 'subComponents/TextComponent';
import GlobalStructure from 'subComponents/GlobalStructure';
import CustomSingleLineText from './CustomSingleLineText';
import { useI18n } from 'next-localization';
import clsx from 'clsx';
import { useGlobalContext } from 'globalContext/context';
import { useNewsletterBannerContext } from './context';
import Button from 'subComponents/Button';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

const NewsletterBanner = (props) => {
  const {
    fields,
    googleRecaptchaVerifiedKey,
    setGoogleRecaptchaVerifiedKey,
    rendering,
    setRefreshReCaptcha,
    refreshReCaptcha,
  } = props;
  const params = props?.params;
  const Styles = params?.Styles;
  const { recaptchaDesclaimer, image, shortDescription, title, titleTag } = fields;
  const { t } = useI18n();

  const { isDesktopLayout } = useGlobalContext();
  const { value, setShouldShowThankYouComp, shouldShowThankYouComp, setValue } =
    useNewsletterBannerContext();

  const shouldRenderImage = !!image?.value?.src;
  const shouldRecaptchaDesclaimer = !!recaptchaDesclaimer?.value;

  useEffect(() => {
    if (refreshReCaptcha?.shouldSubmit && !!googleRecaptchaVerifiedKey) {
      handleFetchData();
    }
  }, [googleRecaptchaVerifiedKey]);

  const handleFetchData = async () => {
    const apiData = {
      properties: {
        email: value?.value,
        form_source: 'news_letter',
      },
      recaptchaToken: googleRecaptchaVerifiedKey,
    };
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/api/route`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      const jsonResponse = await response.json();

      if (jsonResponse?.success) {
        setShouldShowThankYouComp(true);
      } else {
        const errorsConst = {
          1: t('newsletter_recaptcha_error'),
          2: t('newsletter_email_exists'),
        };
        const errorMessage = errorsConst?.[jsonResponse?.errorCode];

        setValue((preValue) => ({
          ...preValue,
          errors: [errorMessage],
          isValid: false,
        }));
      }
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  const isButtonDisabled = !value?.isValid;

  return (
    <>
      <GlobalStructure
        className={clsx(styles['NewsletterBanner'], shouldShowThankYouComp && styles['hide'])}
        anchorId={props?.rendering?.uid}
        isExpendRight={isDesktopLayout ? true : false}
        paddingClass={Styles}
      >
        <div className={styles['content-container']}>
          <div className={styles['content-section']}>
            <TitleComponent field={title} headingTag={titleTag} className={styles['title']} />
            <TextComponent field={shortDescription} className={styles['description']} />
            <CustomSingleLineText className={styles['email-field']} />
            {shouldRecaptchaDesclaimer && (
              <TextComponent
                className={styles['recaptcha-disclaimer']}
                field={recaptchaDesclaimer}
              />
            )}
            <Button
              className={clsx('primary-button button-primary', styles['submit-btn'])}
              onClick={() => {
                setGoogleRecaptchaVerifiedKey('');
                setRefreshReCaptcha((preValue) => ({
                  shouldInsert: true,
                  count: preValue.count + 1,
                  shouldSubmit: false,
                }));
              }}
              text={t('newsletter_submit_text')}
              disabled={isButtonDisabled}
            />
          </div>
          <div className={styles['image-section']}>
            {shouldRenderImage && (
              <ImageRenderer
                className={styles['background-image']}
                mobileSrc={image}
                desktopSrc={image}
              />
            )}
          </div>
        </div>
      </GlobalStructure>
        <Placeholder name="newsletter-banner-inner" {...{ rendering }} />
    </>
  );
};
export default NewsletterBanner;
