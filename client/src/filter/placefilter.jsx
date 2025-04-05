import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { formDataAtom, collegelist } from "../atom/store";

const PlaceFilter = () => {
  // Get the places selected by the user
  const placePreferences = useRecoilValue(formDataAtom).placePreferences;
  
  // Recoil state for college list and setter (not needed for display now, but kept for handling remove)
  const [collegeList, setCollegeList] = useRecoilState(collegelist);
  
  // Recoil setter for formDataAtom
  const setFormData = useSetRecoilState(formDataAtom);
  
  // Local state for places to allow removal and updates
  const [places, setPlaces] = useState(placePreferences);

  // Handle place removal
  const handlePlaceRemove = (place) => {
    // Remove the place from local state
    const updatedPlaces = places.filter(item => item.value !== place.value);
    setPlaces(updatedPlaces);

    // Update the global placePreferences in formDataAtom
    setFormData(prevState => ({
      ...prevState,
      placePreferences: updatedPlaces
    }));

    // Update the college list by removing colleges related to the removed place
    setCollegeList(prevList => prevList.filter(college => college.place !== place.value));
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2 text-center">I. Selected Places</h3>

      {/* Display the selected places with remove buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-7">
        {places.length > 0 ? (
          places.map((place, index) => (
            <div key={index} className="flex items-center bg-gray-100 p-2 rounded-lg">
              <span className="mr-2">{place.label}</span> {/* Display the label of the place */}
              <button
                onClick={() => handlePlaceRemove(place)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No places selected.</p>
        )}
      </div>
    </div>
  );
};

export default PlaceFilter;
