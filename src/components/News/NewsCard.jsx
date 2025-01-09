
import newsIMG from "../../assets/newsIMG.jpeg"
const NewsCard = ({ image, title, description, url }) => {
    return (
      <div className="bg-white p-4 rounded shadow hover:shadow-xl transition duration-200 ">
        <img
          src={image ||newsIMG }
          alt={title}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="mt-2 text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-500 hover:underline"
        >
          Read more
        </a>
      </div>
    );
  };
  
  export default NewsCard;
  