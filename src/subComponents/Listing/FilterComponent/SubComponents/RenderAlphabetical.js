import SitecoreIcon from "components/Shared/components/SitecoreIcon";
import React from "react";
import clsx from "clsx";
import useCustomFunctions from "../Utils";
import { useListingComponentContext } from "../../context/ListingComponentContext";

const RenderAlphabetical = () => {
  const {
    i18n,
    setPageFromPagination,
    rawData,
    hideAlphabeticalFilter,
    filters,
    setFilters,
  } = useListingComponentContext();
  const {
    getFilterIndex,
    getFilterLabel,
    getFiltersSelectOptions,
    removeSingleFilter,
    resetCheckBoxes,
  } = useCustomFunctions();

  const alphabet_list = {
    ar: "ابتثجحخدذرزسشصضطظعغفقكلمنهوي",
    en: "abcdefghijklmnopqrstuvwxyz",
  };
  const i18n_alphabet = alphabet_list[i18n.language];
  const alphabets = i18n_alphabet.split("");
  const filterKey = "title";
  const filterIndex = getFilterIndex(filters, filterKey);
  const selectOptions = getFiltersSelectOptions(rawData);
  return (
    <>
      {!!hideAlphabeticalFilter && (
        <div className="alphabets-letters">
          {alphabets.map((alphabet, index) => {
            return (
              <div className="alphabet-wrapper" key={index}>
                <div
                  className={
                    filters !== null &&
                    filters?.[filterIndex]?.value.split("*", 1)[0] ===
                      alphabet.toLowerCase()
                      ? `alphabet-label active`
                      : `alphabet-label`
                  }
                  data-letter={alphabet}
                  onClick={(e) =>
                    handleAlphabetChange(
                      filters,
                      filterKey,
                      setFilters,
                      alphabet,
                      e
                    )
                  }
                >
                  {alphabet.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filters && (
        <div
          className={clsx(
            "selected-filters",
            !!hideAlphabeticalFilter && "alphabetical-hidden"
          )}
        >
          {!!filters &&
            filters.map((filter, index) => {
              if (filter?.name !== filterKey) {
                const currrentChosenValues = filter?.value
                  ?.replace("in:", "")
                  ?.split(",");
                return currrentChosenValues?.map((singleChosenValue, index) => {
                  return (
                    <div
                      className="single-selected-filter"
                      key={index}
                      onClick={(e) => {
                        removeSingleFilter(
                          filters,
                          filter?.name,
                          singleChosenValue,
                          setFilters,
                          setPageFromPagination
                        );
                      }}
                    >
                      <div className="single-filter-label">
                        {getFilterLabel(
                          singleChosenValue,
                          filter?.name,
                          selectOptions
                        )}
                      </div>
                      <SitecoreIcon
                        className="close"
                        icon="removeFilter"
                        alt="removeFilter"
                      />
                    </div>
                  );
                });
              }
            })}
          {!!filters && (
            <SitecoreIcon
              className="resetFilter-checkbox"
              icon="ico_refresh"
              alt="ico_refresh"
              onClick={() =>
                resetCheckBoxes(setFilters, "category", setPageFromPagination)
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default RenderAlphabetical;
