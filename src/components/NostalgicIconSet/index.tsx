import * as S from './styles';

const IconSet = [
	{ name: 'Recados', slug: 'recados', icon: 'book' },
	{ name: 'Fotos', slug: 'fotos', icon: 'camera' },
	{ name: 'Videos', slug: 'videos', icon: 'video-camera' },
	{ name: 'Fãs', slug: 'fas', icon: 'star' },
	{ name: 'Mensagens', slug: 'mensagens', icon: 'email' },
];

const Myself = [
	{ name: 'Confiável', slug: 'confiavel', icon: 'smile' },
	{ name: 'Legal', slug: 'legal', icon: 'cool' },
	{ name: 'Sexy', slug: 'sexy', icon: 'heart' },
];

const indexes = [0, 1, 2];

export default function NostalgicIconSet(props) {
	return (
		<S.List>
			{IconSet.map(({ name, slug, icon }) => (
				<li key={`orkut__icon_set__${slug}`}>
					<span
						style={{ gridArea: 'title' }}
						className='NostalgicIconSet__title'
					>
						{name}
					</span>
					<span
						className='NostalgicIconSet__number'
						style={{ gridArea: 'number' }}
					>
						<img
							key={`orkut__icon_set__${slug}_img`}
							className='NostalgicIconSet__iconSample'
							src={`https://alurakut.vercel.app/icons/${icon}.svg`}
						/>
						{props[slug] ? props[slug] : 0}
					</span>
				</li>
			))}

			{Myself.map(({ name, slug, icon }) => {
				const total = props[slug] ? props[slug] : 2;

				return (
					<li key={`orkut__icon_set__${slug}`}>
						<span className='NostalgicIconSet__title'>{name}</span>

						<span
							className='NostalgicIconSet__iconComplex NostalgicIconSet__number'
							style={{ gridArea: 'number' }}
						>
							{indexes.map((_, index) => {
								const isHeartActive = index <= total - 1;

								return (
									<img
										key={`orkut__icon_set__${slug}_img_${index}`}
										src={`https://alurakut.vercel.app/icons/${icon}.svg`}
										style={{
											marginRight: '2px',
											opacity: isHeartActive ? 1 : '0.5',
										}}
									/>
								);
							})}
						</span>
					</li>
				);
			})}
		</S.List>
	);
}
