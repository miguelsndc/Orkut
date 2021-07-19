import * as S from './styles';

export default function Spinner() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<S.Spinner>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</S.Spinner>
		</div>
	);
}
