import { useState } from "react";
import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import { Info } from "lucide-react";

export type BannerProps = {
  /** Main heading shown in the banner */
  title: string;
  /** Optional supporting text below the title (always visible) */
  subtitle?: string;
  /** Extra detail shown when the info icon is opened; defaults to built-in help if omitted */
  information?: React.ReactNode;
};

const defaultInformation = (
  <>
    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, opacity: 0.95 }}>
      How to use this dashboard
    </Typography>
    <Typography variant="body2" component="ul" sx={{ m: 0, pl: 2.5, opacity: 0.92 }}>
      <li>Use filters at the top to narrow users, addresses, departments, and divisions.</li>
      <li>Click column headers to sort. The addresses table is paginated (10 per page).</li>
      <li>Record counts update based on your current filters.</li>
    </Typography>
  </>
);

/**
 * Full-width banner with title and an info icon to show or hide extra information.
 */
export default function Banner({ title, subtitle, information }: BannerProps) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <Paper
      component="header"
      elevation={2}
      square
      sx={{
        width: "100%",
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: "primary.contrastText",
        borderRadius: 0,
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 2.5 },
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {subtitle ? (
            <Typography
              variant="subtitle1"
              component="p"
              sx={{
                mt: 1,
                opacity: 0.92,
                fontWeight: 400,
                maxWidth: "48rem",
              }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        <IconButton
          type="button"
          onClick={() => setInfoOpen((v) => !v)}
          aria-label={infoOpen ? "Hide information" : "Show information"}
          aria-expanded={infoOpen}
          sx={{
            color: "inherit",
            flexShrink: 0,
            mt: -0.5,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
          }}
        >
          <Info size={24} strokeWidth={2} aria-hidden />
        </IconButton>
      </Box>

      <Collapse in={infoOpen} timeout="auto">
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.28)",
          }}
        >
          {information ?? defaultInformation}
        </Box>
      </Collapse>
    </Paper>
  );
}
