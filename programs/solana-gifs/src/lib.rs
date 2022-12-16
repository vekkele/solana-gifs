use anchor_lang::prelude::*;

declare_id!("HuLCc7aj2iw2Zfb2XbVsNQpiixa6MhydxkSdf5CsMTvY");

#[program]
pub mod solana_gifs {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_gifs = 0;

        Ok(())
    }

    pub fn add_gif(ctx: Context<AddGif>, gif_url: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let user = &ctx.accounts.user;

        let gif_item = GifItem {
            gif_url,
            user_address: user.key(),
        };

        base_account.gif_list.push(gif_item);
        base_account.total_gifs += 1;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorDeserialize, AnchorSerialize)]
pub struct GifItem {
    pub gif_url: String,
    pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
    pub gif_list: Vec<GifItem>,
}
