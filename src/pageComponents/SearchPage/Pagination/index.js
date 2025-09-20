import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Icon, IconButton, PaginationItem, Typography, useMediaQuery } from '@mui/material';
import { useSearchPageContext } from '../Context';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useI18n } from 'next-localization';
import { Pagination as MUIPagination } from '@mui/material';

const Pagination = React.forwardRef(({ scrollToRef, pageCount }, _) => {
  const { t } = useI18n();
  const { setPageFromPagination, page } = useSearchPageContext();
  const [show, setShow] = useState(true);
  // const [pageLoaded, setPageLoaded] = useState(false);
  const [scrollToTopState, setScrollToTopState] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const handlePageClick = (event) => {
    if (event > 0) {
      setCanScroll(true);
    }
    setPageFromPagination(event);
    setScrollToTopState(true);
  };

  useEffect(() => {
    if (canScroll && scrollToTopState && !!scrollToRef?.current?.offsetTop) {
      const scrollToTop = {
        behavior: 'smooth',
        top: scrollToRef?.current?.offsetTop,
      };
      window.scrollTo(scrollToTop);
    }
  }, [scrollToTopState, page]);

  const showPagination = pageCount > 1 && show;
  // const isDesktopLayout = useMediaQuery('(min-width:769px)');

  return (
    <>
      {/* {showPagination && (
        <ReactPaginate
          className={styles['pagination-component']}
          // initialPage={page - 1}
          // forcePage={page - 1}
          breakLabel="..."
          nextLabel={
            <div className={clsx(styles['paginationArrow'], styles['right'])}>{t('btn_next')}</div>
          }
          // onPageChange={(e) => {
          //   handlePageClick(e);
          // }}
          pageRangeDisplayed={isDesktopLayout ? 4 : 3}
          marginPagesDisplayed={isDesktopLayout ? 1 : 0}
          pageCount={pageCount}
          previousLabel={
            <div className={clsx(styles['paginationArrow'], styles['left'])}>{t('btn_prev')}</div>
          }
          renderOnZeroPageCount={null}
        />
      )} */}
      {showPagination && (
        <MUIPagination
          count={pageCount}
          className={styles['pagination-component']}
          onChange={(e, value) => {
            handlePageClick(value);
          }}
          page={page}
          shape="rounded"
          // boundaryCount={2}
          siblingCount={0}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: () => (
                  <div className={clsx(styles['paginationArrow'], styles['right'])}>
                    {t('btn_next')}
                  </div>
                ),
                next: () => (
                  <div className={clsx(styles['paginationArrow'], styles['left'])}>
                    {t('btn_prev')}
                  </div>
                ),
              }}
              {...item}
            />
          )}
        />
      )}
    </>
  );
});

export default Pagination;
