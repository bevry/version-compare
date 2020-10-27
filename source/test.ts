import { equal } from 'assert-helpers'
import kava from 'kava'

import versionCompare, { Version, VersionIs } from './index.js'

const fixtures: Array<{
	input: [current: Version, other: Version]
	expected: VersionIs
}> = [
	{
		input: [0, 0],
		expected: VersionIs.EqualTo,
	},
	{
		input: [0, 1],
		expected: VersionIs.LessThan,
	},
	{
		input: [0, '1.0'],
		expected: VersionIs.LessThan,
	},
	{
		input: [0, 1.1],
		expected: VersionIs.LessThan,
	},
	{
		input: [1, 1],
		expected: VersionIs.EqualTo,
	},
	{
		input: [1, '1.0'],
		expected: VersionIs.EqualTo,
	},
	{
		input: [1, 1.1],
		expected: VersionIs.EqualTo,
	},
	{
		input: ['1.0', 1.1],
		expected: VersionIs.LessThan,
	},
	{
		input: [1.2, 1.1],
		expected: VersionIs.GreaterThan,
	},
	{
		input: [1, 0],
		expected: VersionIs.GreaterThan,
	},
	{
		input: ['1.0', 0],
		expected: VersionIs.GreaterThan,
	},
	{
		input: ['1.0', 1],
		expected: VersionIs.EqualTo,
	},
]

kava.suite('version-compare', function (suite, test) {
	for (const fixture of fixtures) {
		const name = `versionCompare(${JSON.stringify(
			fixture.input[0]
		)}, ${JSON.stringify(fixture.input[1])}) = ${JSON.stringify(
			fixture.expected
		)}`
		test(name, function () {
			equal(versionCompare(...fixture.input), fixture.expected)
		})
	}
	test('sort', function () {
		equal(['1.1', '2', '1.0'].sort(versionCompare).join(', '), '1.0, 1.1, 2')
	})
})
