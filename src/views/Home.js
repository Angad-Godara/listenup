import Section from "../Components/Section";
import songs from "../data/songs"

function Home() {

	return (
		<div className="grid gap-y-8">
			<Section
				title="Recently played"
				// no more podcasts to show
				// more="/recentlyplayed"
				items={songs}
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
