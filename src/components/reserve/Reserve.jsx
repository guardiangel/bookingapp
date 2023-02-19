import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch.js";

const Reserve = ({ setOpen, hotelId }) => {
  console.log(hotelId);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);

  console.log(data);

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rTitle">{item.desc}</div>
              <div className="rMax">
                Max people:<b>{item.maxPeople}</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserve;
