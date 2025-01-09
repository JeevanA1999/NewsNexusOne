import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import gaurdianLogo from "../../assets/gaurdian_logo.png";
import NewsCard from "./NewsCard";
import { api_Constant } from "../../config/NetworkConfig";
import newsIMG from "../../assets/newsIMG.jpeg";
import { GridLoader } from "react-spinners";
import SearchComponent from "../Search/Serachcomponent.jsx";
import { toggleSearch } from "../../Store/searchSlice";
import { FaSearch } from "react-icons/fa";
//import Personalized from "../Personalized/Personalized";
//import { CiFilter } from "react-icons/ci";

const NewsComponent = () => {
  const [newsData, setNewsData] = useState({
    news: [],
    nytNews: [],
    guardianNews: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count,setCount]=useState(0)

  const defaultGeneral = useSelector((state) => state.items.defaultGeneral);
  const defaultSource = useSelector((state) => state.items.defaultSource);
  const defaultDate = useSelector((state) => state.items.defaultDate);
  const selectedCat = useSelector((state) => state.items.selectedCat);

  const dispatch = useDispatch();
  const searchToggle = useSelector((state) => state.searchItems.searchToggle);

  // const [showFilterModal, setShowFilterModal] = useState(false);

  const handleToggle = () => {
    dispatch(toggleSearch());
  };

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    const fetchApi = (url) => axios.get(url).catch(() => null); // Handle failed requests

    try {
      const dateParam = defaultDate.replace(/-/g, "");
      const urls = {
        newsApi: `https://newsapi.org/v2/everything?q=${defaultGeneral}&from=${defaultDate}&apiKey=${api_Constant.REACT_APP_NEWS_API_KEY}`,
        nytApi: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${defaultGeneral}&begin_date=${dateParam}&api-key=${api_Constant.REACT_APP_NEW_YORK_TIMES}`,
        guardianApi: `https://content.guardianapis.com/search?page=2&q=${defaultGeneral}&from-date=${defaultDate}&api-key=${api_Constant.REACT_APP_GAURDIAN_NEWS}`,
      };

      const [newsApiResponse, nytApiResponse, guardianApiResponse] =
        await Promise.all([
          fetchApi(urls.newsApi),
          fetchApi(urls.nytApi),
          fetchApi(urls.guardianApi),
        ]);

      console.log(newsApiResponse, nytApiResponse, guardianApiResponse);

      setNewsData({
        news: newsApiResponse?.data?.articles || [],
        nytNews: nytApiResponse?.data?.response?.docs || [],
        guardianNews: guardianApiResponse?.data?.response?.results || [],
      });
    } catch (err) {
      setError("Failed to fetch news. Please try again later.", err);
    } finally {
      setLoading(false);
    }
  }, [defaultGeneral, defaultDate]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews, selectedCat]);

  const renderArticles = useCallback(
    (articles, source) => {
      if (!articles.length) return <div>No articles found</div>;

      return articles.map((article, index) => {
        let image, title, description, url;

        const isValidArticle = filterByAuthor(source, article);
        if (!isValidArticle) return null;

        switch (source) {
          case "newsapi":
            // Remove  condition
            if (
              article.content === "[Removed]" ||
              !filterByAuthor("newsapi", article) ||
              !filterByCat("newsapi", article) ||
              !filterBySource("newsapi", article)
            ) {
              return null;
            } else {
              image = article.urlToImage || newsIMG;
              title = article.title;
              description = article.description;
              url = article.url;
            }
            break;

          case "nyt":
            if (
              article.content === "[Removed]" ||
              !filterByAuthor("nyt", article) ||
              !filterByCat("nyt", article) ||
              !filterBySource("nyt", article)
            ) {
              return null;
            } else {
              image = article.multimedia?.[0]?.url
                ? `https://www.nytimes.com/${article.multimedia[0].url}`
                : newsIMG;
              title = article.headline.main;
              description = article.snippet;
              url = article.web_url;
            }

            break;

          case "guardian":
            if (
              article.content === "[Removed]" ||
              !filterByAuthor("newsapi", article) ||
              !filterByCat("newsapi", article) ||
              !filterBySource("newsapi", article)
            ) {
              return null;
            } else {
              image = gaurdianLogo;
              title = article.webTitle;
              description = article.sectionName;
              url = article.webUrl;
            }
            break;

          default:
            return null;
        }

        // if(article){
        //   setCount(count)
        // })
        return (
          <NewsCard
            key={index}
            image={image}
            title={title}
            description={description}
            url={url}
            source={source}
          />
        );
      });
    },
    [selectedCat]
  );

  useEffect(() => {
    const calculateTotalCards = () => {
      let total = 0;
      if (defaultSource === "All Source") {
        total += newsData.news.filter(article => 
          filterByAuthor("newsapi", article) && 
          filterByCat("newsapi", article) && 
          filterBySource("newsapi", article) &&
          article.content !== "[Removed]"
        ).length;
        
        total += newsData.nytNews.filter(article => 
          filterByAuthor("nyt", article) && 
          filterByCat("nyt", article) && 
          filterBySource("nyt", article) &&
          article.content !== "[Removed]"
        ).length;
        
        total += newsData.guardianNews.filter(article => 
          filterByAuthor("guardian", article) && 
          filterByCat("guardian", article) && 
          filterBySource("guardian", article) &&
          article.content !== "[Removed]"
        ).length;
      } else {
        const sourceData = {
          "News API Org": { data: newsData.news, source: "newsapi" },
          "The New York Times": { data: newsData.nytNews, source: "nyt" },
          "The Guardian": { data: newsData.guardianNews, source: "guardian" }
        }[defaultSource];
  
        if (sourceData) {
          total = sourceData.data.filter(article =>
            filterByAuthor(sourceData.source, article) &&
            filterByCat(sourceData.source, article) &&
            filterBySource(sourceData.source, article) &&
            article.content !== "[Removed]"
          ).length;
        }
      }
      setCount(total);
    };
  
    calculateTotalCards();
  }, [newsData, defaultSource, selectedCat]);
  const filterByAuthor = (cat, article) => {
    // If no authors are selected, show all articles
    if (!selectedCat.authors?.length) return true;

    switch (cat) {
      case "newsapi": {
        const newsApiAuthor = article?.author?.toLowerCase() || "";
        console.log(
          selectedCat.authors.some(
            (author) => author.toLowerCase() === newsApiAuthor
          )
            ? article
            : "different auther",
          "articlearticle",
          selectedCat.authors.some(
            (author) => author.toLowerCase() === newsApiAuthor
          )
        );

        return selectedCat.authors.some(
          (author) => author.toLowerCase() === newsApiAuthor
        );
      }

      case "nyt": {
        const nytAuthor = article?.byline?.original?.toLowerCase() || "";
        return selectedCat.authors.some(
          (author) => author.toLowerCase() === nytAuthor
        );
      }

      case "guardian": {
        const guardianAuthor = article?.original?.toLowerCase() || "";
        return selectedCat.authors.some(
          (author) => author.toLowerCase() === guardianAuthor
        );
      }

      default:
        return false;
    }
  };

  const filterByCat = (cat, article) => {
    // If no categories are selected, show all articles
    if (!selectedCat.categories?.length) return true;

    switch (cat) {
      case "newsapi": {
        const newsApiCategory = article?.category?.toLowerCase() || "";
        return selectedCat.categories.some(
          (category) => category.toLowerCase() === newsApiCategory
        );
      }

      case "nyt": {
        const nytCategory = article?.news_desk?.toLowerCase() || "";
        return selectedCat.categories.some(
          (category) => category.toLowerCase() === nytCategory
        );
      }

      case "guardian": {
        const guardianCategory = article?.pillarName?.toLowerCase() || "";
        return selectedCat.categories.some(
          (category) => category.toLowerCase() === guardianCategory
        );
      }

      default:
        return false;
    }
  };

  const filterBySource = (cat, article) => {
    // If no sources are selected, show all articles
    if (!selectedCat.sources?.length) return true;

    switch (cat) {
      case "newsapi": {
        const newsApiSource = article?.source?.name?.toLowerCase() || "";
        return selectedCat.sources.some(
          (source) => source.toLowerCase() === newsApiSource
        );
      }

      case "nyt": {
        const nytSource = article?.source?.toLowerCase() || "";
        return selectedCat.sources.some(
          (source) => source.toLowerCase() === nytSource
        );
      }

      case "guardian": {
        const guardianSource = article?.sectionName?.toLowerCase() || "";
        return selectedCat.sources.some(
          (source) => source.toLowerCase() === guardianSource
        );
      }

      default:
        return false;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#26d7e2" size={30} />
      </div>
    );

  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="px-4 py-2 mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-4">
          Top Headlines - {defaultGeneral}
        </h1>
        <div className="flex justify-between">
          <div className="m-4">
            <FaSearch
              size={16}
              onClick={handleToggle}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      {searchToggle && <SearchComponent />}
     {count===0?<p>No data found for Personalized news</p>:
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {defaultSource === "All Source" && (
        <>
          {renderArticles(newsData.news, "newsapi")}
          {renderArticles(newsData.nytNews, "nyt")}
          {renderArticles(newsData.guardianNews, "guardian")}
        </>
      )}
      {defaultSource === "News API Org" &&
        renderArticles(newsData.news, "newsapi")}
      {defaultSource === "The New York Times" &&
        renderArticles(newsData.nytNews, "nyt")}
      {defaultSource === "The Guardian" &&
        renderArticles(newsData.guardianNews, "guardian")}
    </div>}
     
    </div>
  );
};

export default NewsComponent;
