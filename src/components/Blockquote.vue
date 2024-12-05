<script setup>
const props = defineProps({
	type: {
		type: String,
		validator(value) {
			return value == null || ['tip', 'danger', 'caution', 'warning', 'disclaimer'].includes(value)
		}
	}
});
</script>

<template>
	<blockquote :class="(type != null ? ('md-bq bq-' + type) : '')">
		<slot></slot>
	</blockquote>
</template>

<style lang="scss">
blockquote {
	border-left: 2px solid var(--pure-white);
	background-color: var(--background-1);
	padding: 12px 16px;
	margin-left: 0;
	font-size: 18px;

	p:not(p:last-child) {
		margin-bottom: 18px;
	}

	pre:last-child {
		margin-bottom: 0;
	}

	&.md-bq {
		background-color: var(--background-1);
		padding: 12px 16px;
		border-radius: 0;

		&.bq-tip {
			border-left: 2px solid var(--userfeedback-info);
		}

		&.bq-danger,
		&.bq-caution {
			border-left: 2px solid var(--userfeedback-error);
		}

		&.bq-warning,
		&.bq-disclaimer {
			border-left: 2px solid var(--userfeedback-warning);
		}
	}
}
</style>