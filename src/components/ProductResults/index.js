import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchProductsStart } from "../../redux/Products/products.action";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import LoadMore from "../LoadMore";
import Product from "./Product";
import "./style.scss";
const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  const history = useHistory();
  const { filterType, searchProduct } = useParams();
  const [searchValue, setSearchValue] = useState();
  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }
  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
    ],
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // history.push(`/search/${searchValue}`);
    dispatch(
      fetchProductsStart({
        filterType,
        searchProduct: searchValue,
      })
    );
    setSearchValue("");
  };

  const handleSearchFilter = (value) => {
    return value.filter((val) => {
      if (searchValue === "") {
        return val;
      } else if (val.productName.match(searchValue)) {
        return val;
      }
    });
  };

  return (
    <div className="products">
      <h1>Browse Products</h1>
      <div className="productActions">
        <p>{data.length} products was found !</p>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            value={searchValue}
            placeholder="Search your product"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <FormSelect {...configFilters} handleChange={handleFilter} />
      </div>

      <div className="productResults">
        {handleSearchFilter(data).map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            ...product,
          };

          return <Product {...configProduct} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
