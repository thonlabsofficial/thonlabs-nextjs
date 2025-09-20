import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { APIResponseCodes } from '../../shared/utils/errors';
import { forwardSearchParams } from '../../shared/utils/helpers';
import ServerSessionService from '../services/server-session-service';
import Log from '../../shared/utils/log';

export const POST = async (
	_: NextRequest,
	{ params }: { params: { thonlabs: string[] } },
) => {
	const [action] = params.thonlabs;

	switch (action) {
		case 'refresh': {
			const response = await ServerSessionService.validateRefreshToken();
			return Response.json(response, { status: response.statusCode });
		}

		case 'logout':
			await ServerSessionService.logout();
			return Response.json(null, { status: 200 });
	}

	return notFound();
};

export const GET = async (
	req: NextRequest,
	{ params }: { params: { thonlabs: string[] } },
) => {
	let response;
	const [action, param] = params.thonlabs;
	const origin = decodeURIComponent(
		req.nextUrl.searchParams.get('origin') || '',
	);

	if (action !== 'alive' && !origin) {
		const message = 'The origin url is missing for this request';
		Log.error({ action: 'GET Route v14', message });
		return Response.json({ error: message }, { status: 400 });
	}

	switch (action) {
		case 'magic':
			if (!param) {
				return NextResponse.redirect(new URL('/auth/login', origin), 302);
			}

			response = await ServerSessionService.validateMagicToken(param as string);

			return NextResponse.redirect(
				new URL(
					response.statusCode === 200
						? forwardSearchParams(req, '/').toString()
						: `/auth/login?reason=${APIResponseCodes.InvalidMagicToken}`,
					origin,
				),
				302,
			);

		case 'confirm-email':
			response = await ServerSessionService.validateEmailConfirmationToken(
				param as string,
			);

			/*
        If there's a token it means the user is coming from a "invitation" flow,
        the goal is to define password and continue to the app.
      */
			if (response.statusCode === 200 && response.token) {
				const { token, tokenType, email } = response;

				return NextResponse.redirect(
					new URL(
						tokenType === 'ResetPassword'
							? `/auth/reset-password/${token}?inviteFlow=${Buffer.from(
									email,
								).toString('base64')}`
							: `/auth/magic/${token}?inviteFlow=true`,
						origin,
					),
					302,
				);
			}

			return NextResponse.redirect(
				new URL(
					response.statusCode === 200
						? `/?info=${
								ServerSessionService.isValid()
									? APIResponseCodes.EmailConfirmation
									: APIResponseCodes.EmailConfirmationWithoutSession
							}`
						: `/?reason=${
								response?.data?.emailResent
									? APIResponseCodes.EmailConfirmationResent
									: APIResponseCodes.EmailConfirmationError
							}`,
					origin,
				),
				302,
			);

		case 'refresh':
			response = await ServerSessionService.validateRefreshToken();

			if (response.statusCode === 200) {
				const searchParams = req.nextUrl.searchParams;
				const to = searchParams.get('dest') || '/';
				return NextResponse.redirect(new URL(to, origin), 302);
			}

			return NextResponse.redirect(new URL('/auth/logout', origin), 302);

		case 'logout':
			ServerSessionService.logout();
			return NextResponse.redirect(
				new URL(
					forwardSearchParams(req, '/auth/login', { r: 'true' }).toString(),
					origin,
				),
				302,
			);

		case 'alive':
			return Response.json('', { status: 200 });

		case 'sso': {
			const [provider, code] = Buffer.from(param, 'base64')
				.toString()
				.split('::');

			response = await ServerSessionService.validateSSOAuthentication(
				provider,
				code,
			);

			return NextResponse.redirect(
				new URL(
					response.statusCode === 200
						? '/'
						: `/auth/login?reason=${APIResponseCodes.InvalidSSOAuthentication}`,
					origin,
				),
				302,
			);
		}
	}

	return notFound();
};
