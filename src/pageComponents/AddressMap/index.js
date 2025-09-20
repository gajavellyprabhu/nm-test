import styles from './styles.module.scss';
import clsx from 'clsx';
import ImageRenderer from 'subComponents/ImageRenderer';
import Button from 'subComponents/Button';
import GlobalStructure from 'subComponents/GlobalStructure';
import TextComponent from 'subComponents/TextComponent';

export const Default = (props) => {
  const { fields, params } = props;
  const { Styles } = params;
  const {
    address,
    addressLabel,
    email,
    emailLabel,
    phone,
    phoneLabel,
    link,
    backgroundImage,
    backgroundImageMobile,
    addressLabelTitle,
  } = fields;
  const shouldRenderAddressLabel = !!addressLabel?.value;
  const shouldRenderAddressValue = !!address?.value;
  const shouldRenderAddress = shouldRenderAddressLabel || shouldRenderAddressValue;
  const shouldRenderEmailLabel = !!emailLabel?.value;
  const shouldRenderEmailValue = !!email?.value;
  const shouldRenderEmail = shouldRenderEmailLabel || shouldRenderEmailValue;
  const shouldRenderPhoneLabel = !!phoneLabel?.value;
  const shouldRenderPhoneValue = !!phone?.value;
  const shouldRenderPhone = shouldRenderPhoneLabel || shouldRenderPhoneValue;
  const shouldRenderLink = !!link?.value?.text;

  return (
    <GlobalStructure isFullWidth paddingClass={Styles} anchorId={props?.rendering?.uid}>
      <div className={styles['addressComponent']}>
        <div className={styles['image-map']}>
          <ImageRenderer mobileSrc={backgroundImageMobile} desktopSrc={backgroundImage} />
        </div>
        <div className={'component-wrapper'}>
          <div className={clsx(styles['box'], 'component-content')}>
            <div className={styles['addressBox']}>
              <ul>
                {shouldRenderEmail && (
                  <li>
                    {shouldRenderEmailLabel && <TextComponent field={emailLabel} />}
                    {shouldRenderEmailValue && (
                      <TextComponent field={email} className={styles['address']} />
                    )}
                  </li>
                )}
                {shouldRenderPhone && (
                  <li>
                    {shouldRenderPhoneLabel && <TextComponent field={phoneLabel} />}
                    {shouldRenderPhoneValue && (
                      <TextComponent
                        field={phone}
                        className={clsx(styles['address'], styles['phone'])}
                      />
                    )}
                  </li>
                )}
                {shouldRenderAddress && (
                  <li>
                    {shouldRenderAddressLabel && (
                      <TextComponent
                        field={addressLabel}
                        headingTag={addressLabelTitle}
                        className={styles['address-title']}
                      />
                    )}
                    {shouldRenderAddressValue && (
                      <TextComponent field={address} className={styles['address']} />
                    )}
                  </li>
                )}
              </ul>
              {shouldRenderLink && (
                <Button target="_blank" link={link} className="primary-button" />
              )}
            </div>
          </div>
        </div>
      </div>
    </GlobalStructure>
  );
};
