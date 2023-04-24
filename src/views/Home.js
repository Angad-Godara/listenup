import { useSelector } from "react-redux";
import Section from "../Components/Section";
import songs from "../data/songs"
import { selectPodcasts } from "../stores/podcastSlice";

function Home() {

	const { podcasts } = useSelector(selectPodcasts)

	return (
		<div className="grid gap-y-8">
			<Section
				title="Recently played"
				// no more podcasts to show
				// more="/recentlyplayed"
				items={podcasts}
			/>
			<Section
				title="Shows to try"
				// more="/showstotry"
				items={songs}
			/>
			<Section
				// change this with auth username
				title="Made For John Snow"
				// more="/specials"
				items={songs}
			/>
		</div>
	)
}

export default Home
