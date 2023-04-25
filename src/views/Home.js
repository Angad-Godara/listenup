import { useSelector } from "react-redux";
import Section from "../Components/Section";
import songs from "../data/songs"
import { selectPodcasts } from "../stores/podcastSlice";
import {selectUser} from '../stores/userSlice'

function Home() {

	const { podcasts } = useSelector(selectPodcasts)
	const user = useSelector(selectUser)

	return (
		<div className="grid gap-y-8">
			<Section
				title="Recently Uploaded"
				// no more podcasts to show
				// more="/recentlyplayed"
				items={podcasts}
			/>
			<Section
				title="Artists"
				// more="/showstotry"
				items={songs}
			/>
			<Section
				// change this with auth username
				title={`Made For ${user?.username}`}
				// more="/specials"
				items={songs}
			/>
		</div>
	)
}

export default Home
