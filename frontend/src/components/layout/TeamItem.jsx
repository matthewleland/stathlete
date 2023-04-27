import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DefaultProfile from '../../assets/profile.svg'

function TeamItem({ team }) {
  console.log(team)
  return (
    <div className="flex flex-row justify-between card shadow-md compact side bg-base-200">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="w-14 h-14">
              <img
                src={team.logo}
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{team.name}</h2>
          <Link
            className="text-base-content text-opacity-40"
            to={`/teams/${team.id}`}
          >
            View Team
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TeamItem
