import React from 'react';
import { useGlobalContext } from './context'
import { v4 as uuidv4 } from 'uuid';
import ReactAudioPlayer from 'react-audio-player';

const Word = () => {
	const { words, audios, synonyms, examples, isClicked } = useGlobalContext();

	const title = words.word;
	const speech = words.partOfSpeech;
	const source = audios.fileUrl;
	const definition = words.text;
	const instances = examples.text;
	const synon = synonyms;

	return (
		<section className={`${isClicked ? 'output show container' : 'output'}`}>
			<div>
				<h1 >Searched word:</h1>
				<p><span>{title}</span></p>
				<p className="speech">{speech}</p>
			</div>
			<div>
				<h1>Definition:</h1>
				<p>{definition}</p>
			</div>
			<div>
				<h1>Example:</h1>
				<p>{instances}</p>
			</div>
			<div>
				<h1>Synonyms:</h1>
				<div>
					<ul className="synonyms">
						{synon.map(line => (
							<li key={uuidv4()}>{line}</li>
						))}
					</ul>
				</div>
			</div>
			<div>
				<h1>Pronounciation:</h1>
				<ReactAudioPlayer
					src={source}
					controls
				/>
			</div>
		</section>
	)
}


export default Word;