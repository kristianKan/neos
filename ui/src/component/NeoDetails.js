import React from 'react';
import { useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import { useGetNeoByIdQuery } from '../services/neoApi'

const NeoDetails = (_) => {
  const params = useParams();
  let { id } = useSelector((state) => state.list)

  if (!id) {
    id = params.id
  }

  const { data, error, isLoading } = useGetNeoByIdQuery(id)

  let name
  let isHazardous
  if (data) {
    name = data.name
    isHazardous = data.is_potentially_hazardous_asteroid ? 'yes' : 'no'
  }

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) :
      isLoading ? (
        <>loading...</>
      ) : data ? (
        <div>
          <div>
            <strong>Id:</strong> {id}
          </div>
          <div>
            <strong>Name:</strong> {name}
          </div>
          <div>
            <strong>Hazardous:</strong> {isHazardous}
          </div>
          <div>
          </div>
        </div>
      ) : null}
      <Link to='/'>
        <button>←</button>
      </Link>
    </>
  );
};

export default NeoDetails;
